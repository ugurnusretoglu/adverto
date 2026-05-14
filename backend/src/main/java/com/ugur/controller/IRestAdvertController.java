package com.ugur.controller;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoAdvert;
import com.ugur.dto.DtoAdvertIU;

public interface IRestAdvertController {
	
	public RootEntity<DtoAdvert> saveAdvert(DtoAdvertIU dtoAdvertIU, List<MultipartFile> files);
	
}
