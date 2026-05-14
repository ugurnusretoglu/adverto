package com.ugur.controller;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface IRestImageController {
	
	public RootEntity<Map<String, Object>> upload(MultipartFile file);
	
}
