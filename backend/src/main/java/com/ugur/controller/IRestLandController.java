package com.ugur.controller;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoLand;
import com.ugur.dto.DtoLandIU;

public interface IRestLandController {
	
	public RootEntity<DtoLand> saveLand(DtoLandIU dtoLandIU, List<MultipartFile> files);
	
}
