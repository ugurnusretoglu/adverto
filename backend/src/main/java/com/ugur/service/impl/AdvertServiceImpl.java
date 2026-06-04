package com.ugur.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoAdvert;
import com.ugur.dto.DtoAdvertIU;
import com.ugur.dto.DtoAdvertSummary;
import com.ugur.dto.DtoImage;
import com.ugur.exception.BaseException;
import com.ugur.exception.ErrorMessage;
import com.ugur.exception.MessageType;
import com.ugur.model.Advert;
import com.ugur.model.House;
import com.ugur.model.Image;
import com.ugur.model.Land;
import com.ugur.model.User;
import com.ugur.model.Vehicle;
import com.ugur.repository.AdvertRepository;
import com.ugur.repository.ImageRepository;
import com.ugur.repository.UserRepository;
import com.ugur.service.IAdvertService;
import com.ugur.service.IImageService;

@Service
public class AdvertServiceImpl implements IAdvertService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AdvertRepository advertRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private IImageService iImageService;
	
	public User getCurrentUser() {
		Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		
		return userRepository.findByUsername(currentPrincipalName)
				.orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.USERNAME_NOT_FOUND, currentPrincipalName)));
	}
	
	public Advert createAdvert(DtoAdvertIU dtoAdvertIU) {
		User user = getCurrentUser();
		
		Advert advert=new Advert();
		advert.setCreatedAt(new Date());
		advert.setAdvertNumber(dtoAdvertIU.getAdvertNumber());
		advert.setAdvertName(dtoAdvertIU.getAdvertName());
		advert.setAdvertNumber(dtoAdvertIU.getAdvertNumber());
		advert.setPrice(dtoAdvertIU.getPrice());
		advert.setDescription(dtoAdvertIU.getDescription());
		advert.setAdStatus(dtoAdvertIU.getAdStatus());
		advert.setUser(user);
		
		return advert;
	}
	
	public List<Image> uploadImages(List<MultipartFile> files, Advert advert){
		return files.stream().map(file -> {
			Map<String, Object> data = iImageService.upload(file);
			Image image = new Image();
			image.setCreatedAt(new Date());
			image.setUrl((String) data.get("secure_url"));
			image.setPublicId((String) data.get("public_id"));
			image.setAdvert(advert);
			return imageRepository.save(image);
		}).collect(Collectors.toCollection(ArrayList::new));
	}

	@Override
	public DtoAdvert saveAdvert(DtoAdvertIU dtoAdvertIU, List<MultipartFile> files) {
		DtoAdvert dtoAdvert = new DtoAdvert();
		Advert savedAdvert = advertRepository.save(createAdvert(dtoAdvertIU));
		
		List<Image> images = uploadImages(files, savedAdvert);
		savedAdvert.setImages(images);
		advertRepository.save(savedAdvert);
		
		BeanUtils.copyProperties(savedAdvert, dtoAdvert);
		
		List<DtoImage> dtoImages = images.stream().map(image -> {
			DtoImage dtoImage = new DtoImage();
			BeanUtils.copyProperties(image, dtoImage);
			return dtoImage;
		}).toList();
		dtoAdvert.setImages(dtoImages);
		
		return dtoAdvert;
	}

	@Override
	public List<DtoAdvertSummary> getAllAdverts() {
		List<Advert> adverts = advertRepository.findAllWithImages();
		
		return adverts.stream().map(advert -> {
			DtoAdvertSummary summary = new DtoAdvertSummary();
			BeanUtils.copyProperties(advert, summary);
			
			if(advert.getImages() != null && !advert.getImages().isEmpty()) {
				summary.setCoverImageUrl(advert.getImages().get(0).getUrl());
			}
			
			if(advert instanceof Vehicle) {
				summary.setAdvertType("VEHICLE");
			}
			else if (advert instanceof House) {
				summary.setAdvertType("HOUSE");
			}
			else if (advert instanceof Land) {
				summary.setAdvertType("LAND");
			}
			
			return summary;
			
		}).toList();
	}	
}
