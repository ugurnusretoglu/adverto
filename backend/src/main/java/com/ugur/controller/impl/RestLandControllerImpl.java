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

import com.ugur.controller.IRestLandController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoLand;
import com.ugur.dto.DtoLandIU;
import com.ugur.service.ILandService;

@RestController
@RequestMapping("/rest/api/land")
public class RestLandControllerImpl extends RestBaseController implements IRestLandController {
	
	@Autowired
	private ILandService iLandService;
	
	@PostMapping("/save")
	@Override
	public RootEntity<DtoLand> saveLand(@RequestPart("land") DtoLandIU dtoLandIU, 
			@RequestPart("images") List<MultipartFile> files) {
		return ok(iLandService.saveLand(dtoLandIU, files));
	}
	
	@GetMapping("/{id}")
	@Override
	public RootEntity<DtoLand> getLandById(@PathVariable Long id) {
		return ok(iLandService.getLandById(id));
	}
}
