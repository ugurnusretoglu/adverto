package com.ugur.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.RootEntity;

public interface IRestEstateController {

	public RootEntity<DtoEstate> saveEstate(DtoEstateIU dtoEstateIU, List<MultipartFile> files);
	
}
