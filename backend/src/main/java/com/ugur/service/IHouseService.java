package com.ugur.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoHouse;
import com.ugur.dto.DtoHouseIU;

public interface IHouseService {
	
	public DtoHouse saveHouse(DtoHouseIU dtoHouseIU, List<MultipartFile> files);
	
	public DtoHouse getHouseById(Long id);
}
