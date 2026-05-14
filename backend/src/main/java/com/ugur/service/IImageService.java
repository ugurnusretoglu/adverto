package com.ugur.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface IImageService {
	
	public Map<String, Object> upload(MultipartFile file);
	
}
