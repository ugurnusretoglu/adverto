package com.ugur.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoAddress;
import com.ugur.dto.DtoImage;
import com.ugur.dto.DtoLand;
import com.ugur.dto.DtoLandIU;
import com.ugur.model.Address;
import com.ugur.model.Image;
import com.ugur.model.Land;
import com.ugur.repository.LandRepository;
import com.ugur.service.ILandService;

@Service
public class LandServiceImpl implements ILandService {
	
	@Autowired
	private LandRepository landRepository;
	
	@Autowired
	private AdvertServiceImpl advertServiceImpl;

	public Land createLand(DtoLandIU dtoLandIU) {
		Land land = new Land();
		BeanUtils.copyProperties(dtoLandIU, land);
		land.setUser(advertServiceImpl.getCurrentUser());
		land.setCreatedAt(new Date());
		
		if(dtoLandIU.getDtoAddress() != null) {
			Address address = new Address();
			BeanUtils.copyProperties(dtoLandIU.getDtoAddress(), address);
			land.setAddress(address);
		}
		
		return land;
	}
	
	@Override
	public DtoLand saveLand(DtoLandIU dtoLandIU, List<MultipartFile> files) {
		DtoLand dtoLand = new DtoLand();
		Land savedLand = landRepository.save(createLand(dtoLandIU));
		
		List<Image> images = advertServiceImpl.uploadImages(files, savedLand);
		savedLand.setImages(images);
		landRepository.save(savedLand);
		
		BeanUtils.copyProperties(savedLand, dtoLand);
		
		List<DtoImage> dtoImages = images.stream().map(image -> {
			DtoImage dtoImage = new DtoImage();
			BeanUtils.copyProperties(image, dtoImage);
			return dtoImage;
		}).toList();
		dtoLand.setImages(dtoImages);
		
		if(savedLand.getAddress() != null) {
			DtoAddress dtoAddress = new DtoAddress();
			BeanUtils.copyProperties(savedLand.getAddress(), dtoAddress);
			dtoLand.setDtoAddress(dtoAddress);
		}
		
		return dtoLand;
	} 
 
}
