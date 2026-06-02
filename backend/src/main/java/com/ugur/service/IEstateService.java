package com.ugur.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoEstate;
import com.ugur.dto.DtoEstateIU;

public interface IEstateService {
	
	public DtoEstate saveEstate(DtoEstateIU dtoEstateIU, List<MultipartFile> files);
	
}