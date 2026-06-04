package com.ugur.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.IRestAdvertController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoAdvert;
import com.ugur.dto.DtoAdvertIU;
import com.ugur.dto.DtoAdvertSummary;
import com.ugur.service.IAdvertService;

@RestController
@RequestMapping("/rest/api/advert")
public class RestAdvertControllerImpl extends RestBaseController implements IRestAdvertController {
	
	@Autowired
	private IAdvertService iAdvertService;
	
	@PostMapping("/save")
	@Override
	public RootEntity<DtoAdvert> saveAdvert(@RequestPart("advert") DtoAdvertIU dtoAdvertIU,
			@RequestPart("images") List<MultipartFile> files) {
		return ok(iAdvertService.saveAdvert(dtoAdvertIU, files));
	}
	
	@GetMapping("/list")
	@Override
	public RootEntity<List<DtoAdvertSummary>> getAllAdverts() {
		return ok(iAdvertService.getAllAdverts());
	}

}
