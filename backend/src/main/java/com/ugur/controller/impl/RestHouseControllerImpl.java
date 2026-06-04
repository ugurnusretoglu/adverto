package com.ugur.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.IRestHouseController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoHouse;
import com.ugur.dto.DtoHouseIU;
import com.ugur.service.IHouseService;

@RestController
@RequestMapping("rest/api/house")
public class RestHouseControllerImpl extends RestBaseController implements IRestHouseController {
	
	@Autowired
	private IHouseService iHouseService;
	
	@PostMapping("/save")
	@Override
	public RootEntity<DtoHouse> saveHouse(@RequestPart("house") DtoHouseIU dtoHouseIU, 
			@RequestPart("images") List<MultipartFile> files) {
		return ok(iHouseService.saveHouse(dtoHouseIU, files));
	}
	
	@GetMapping("/{id}")
	@Override
	public RootEntity<DtoHouse> getHouseById(@PathVariable Long id) {
		return ok(iHouseService.getHouseById(id));
	}
	
}
