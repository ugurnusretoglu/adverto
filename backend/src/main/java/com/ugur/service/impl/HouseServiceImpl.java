package com.ugur.service.impl;
	
import java.util.Date;
import java.util.List;
	
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
	
import com.ugur.dto.DtoAddress;
import com.ugur.dto.DtoHouse;
import com.ugur.dto.DtoHouseIU;	
import com.ugur.dto.DtoImage;
import com.ugur.model.Address;
import com.ugur.model.House;
import com.ugur.model.Image;
import com.ugur.repository.HouseRepository;	
import com.ugur.service.IHouseService;
	
@Service
public class HouseServiceImpl implements IHouseService {
		
	@Autowired
	private AdvertServiceImpl advertServiceImpl;
		
	@Autowired
	private HouseRepository houseRepository;
		
	public House createHouse(DtoHouseIU dtoHouseIU) {
		House house = new House();
		BeanUtils.copyProperties(dtoHouseIU, house);
		house.setUser(advertServiceImpl.getCurrentUser());
		house.setCreatedAt(new Date());
			
		if(dtoHouseIU.getDtoAddress() != null) {
			Address address = new Address();
			BeanUtils.copyProperties(dtoHouseIU.getDtoAddress(), address);
			house.setAddress(address);
		}
			
		return house;
	}
		
		
	@Override
	public DtoHouse saveHouse(DtoHouseIU dtoHouseIU, List<MultipartFile> files) {			
		DtoHouse dtoHouse = new DtoHouse();
		House savedHouse = houseRepository.save(createHouse(dtoHouseIU));
			
		List<Image> images = advertServiceImpl.uploadImages(files, savedHouse);
		savedHouse.setImages(images);
		houseRepository.save(savedHouse);
			
		BeanUtils.copyProperties(savedHouse, dtoHouse);
			
		List<DtoImage> dtoImages = images.stream().map(image -> {
			DtoImage dtoImage=new DtoImage();
			BeanUtils.copyProperties(image, dtoImage);
			return dtoImage;
		}).toList();
		dtoHouse.setImages(dtoImages);
			
		if(savedHouse.getAddress() != null) {
			DtoAddress dtoAddress = new DtoAddress();
			BeanUtils.copyProperties(savedHouse.getAddress(), dtoAddress);
			dtoHouse.setDtoAddress(dtoAddress);
		}
	
		return dtoHouse;
	} 
	
}
