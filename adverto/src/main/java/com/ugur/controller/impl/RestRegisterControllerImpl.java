package com.ugur.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugur.controller.IRestRegisterController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoUser;
import com.ugur.dto.RegisterRequest;
import com.ugur.service.IRegisterService;

@RestController
public class RestRegisterControllerImpl extends RestBaseController implements IRestRegisterController {
	
	@Autowired
	private IRegisterService registerService;
	
	@PostMapping("/register")
	@Override
	public RootEntity<DtoUser> register(@RequestBody RegisterRequest input) {
		return ok(registerService.register(input));
	}

}
