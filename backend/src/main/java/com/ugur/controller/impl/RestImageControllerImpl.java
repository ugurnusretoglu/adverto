package com.ugur.controller.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.IRestImageController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.service.IImageService;

@RestController
@RequestMapping("/advert/image")
public class RestImageControllerImpl extends RestBaseController implements IRestImageController {
	
	@Autowired
	private IImageService iImageService;
	
	@Override
	@PostMapping("/upload")
	public RootEntity<Map<String,Object>> upload(@RequestParam("image") MultipartFile file) {
		Map<String, Object>  data = this.iImageService.upload(file);
		return ok(data);
	}

}
