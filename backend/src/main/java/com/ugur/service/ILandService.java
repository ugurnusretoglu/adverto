package com.ugur.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoLand;
import com.ugur.dto.DtoLandIU;

public interface ILandService {
	
	public DtoLand saveLand(DtoLandIU dtoLandIU, List<MultipartFile> files);
	
}
