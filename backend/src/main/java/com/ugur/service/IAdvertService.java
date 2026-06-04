package com.ugur.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoAdvert;
import com.ugur.dto.DtoAdvertIU;
import com.ugur.dto.DtoAdvertSummary;

public interface IAdvertService {
	
	public DtoAdvert saveAdvert(DtoAdvertIU dtoAdvertIU, List<MultipartFile> files);
	
	public List<DtoAdvertSummary> getAllAdverts();	
}
