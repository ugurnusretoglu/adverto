package com.ugur.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoEstate;
import com.ugur.dto.DtoEstateIU;
import com.ugur.dto.IRestEstateController;
import com.ugur.service.IEstateService;

@RestController
@RequestMapping("/rest/api/estate")
public class RestEstateControllerImpl extends RestBaseController implements IRestEstateController {
	
	@Autowired
	private IEstateService iEstateService;
	
	@PostMapping("/save")
	@Override
	public RootEntity<DtoEstate> saveEstate(@RequestPart("estate") DtoEstateIU dtoEstateIU, 
			@RequestPart("images") List<MultipartFile> files) {
		return ok(iEstateService.saveEstate(dtoEstateIU, files));
	}
}