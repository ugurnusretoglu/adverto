package com.ugur.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoAddress;
import com.ugur.dto.DtoEstate;
import com.ugur.dto.DtoEstateIU;
import com.ugur.dto.DtoImage;
import com.ugur.model.Address;
import com.ugur.model.Estate;
import com.ugur.model.Image;
import com.ugur.repository.EstateRepository;
import com.ugur.service.IEstateService;

@Service
public class EstateServiceImpl implements IEstateService {

	@Autowired
	private EstateRepository estateRepository;
	
	@Autowired
	private AdvertServiceImpl advertServiceImpl;
	
	public Estate createEstate(DtoEstateIU dtoEstateIU) {
		Estate estate=new Estate();
		BeanUtils.copyProperties(dtoEstateIU, estate);
		estate.setUser(advertServiceImpl.getCurrentUser());
		estate.setCreatedAt(new Date());
		
		if (dtoEstateIU.getDtoAddress() != null) {
	        Address address = new Address();
	        BeanUtils.copyProperties(dtoEstateIU.getDtoAddress(), address);
	        estate.setAddress(address);
	    }
		return estate;
	}
	
	@Override
	public DtoEstate saveEstate(DtoEstateIU dtoEstateIU, List<MultipartFile> files) {
		DtoEstate dtoEstate = new DtoEstate();
		Estate savedEstate = estateRepository.save(createEstate(dtoEstateIU));
		
		List<Image> images = advertServiceImpl.uploadImages(files, savedEstate);
		savedEstate.setImages(images);
		estateRepository.save(savedEstate);
		
		BeanUtils.copyProperties(savedEstate, dtoEstate);
		
		List<DtoImage> dtoImages = images.stream().map(image -> {
			DtoImage dtoImage = new DtoImage();
			BeanUtils.copyProperties(image, dtoImage);
			return dtoImage;
		}).toList();
		dtoEstate.setImages(dtoImages);
		
		if (savedEstate.getAddress() != null) {
			DtoAddress dtoAddress = new DtoAddress();
			BeanUtils.copyProperties(savedEstate.getAddress(), dtoAddress);
			dtoEstate.setDtoAddress(dtoAddress);
		}
		
		return dtoEstate;
	} 
}
