package com.ugur.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.ugur.exception.BaseException;
import com.ugur.exception.ErrorMessage;
import com.ugur.exception.MessageType;
import com.ugur.service.IImageService;

@Service
public class ImageServiceImpl implements IImageService {
	
	@Autowired
	private Cloudinary cloudinary;
	
	@Override
	public Map<String, Object> upload(MultipartFile file) {
		
		try {
			Map<String, Object> data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
			return data;
		} catch (Exception e) {
			throw new BaseException(new ErrorMessage(MessageType.IMAGE_UPLOADING_FAIL, e.getMessage()));
		}
	}
}
