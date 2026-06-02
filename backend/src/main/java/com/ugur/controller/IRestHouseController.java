package com.ugur.controller;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoHouse;
import com.ugur.dto.DtoHouseIU;

public interface IRestHouseController {

	public RootEntity<DtoHouse> saveHouse(DtoHouseIU dtoHouseIU, List<MultipartFile> files);

}
