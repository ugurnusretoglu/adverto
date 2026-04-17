package com.ugur.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ugur.controller.IRestAuthenticationController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.AuthenticateRequest;
import com.ugur.dto.AuthenticateResponse;
import com.ugur.dto.RefreshTokenRequest;
import com.ugur.service.IAuthenticationService;

import jakarta.validation.Valid;

@RestController
public class RestAuthenticationControllerImpl extends RestBaseController implements IRestAuthenticationController {
	
	@Autowired
	private IAuthenticationService authenticateService;
	
	@PostMapping("/authenticate")
	@Override
	public RootEntity<AuthenticateResponse> authenticate(@RequestBody AuthenticateRequest input) {
		
		return ok(authenticateService.authenticate(input));
	}
	
	@PostMapping("/refreshToken")
	@Override
	public RootEntity<AuthenticateResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest input) {
		return ok(authenticateService.refreshToken(input));
	}
	
	@PostMapping("/logout")
	@Override
	public RootEntity<?> logout(String refreshToken) {
		authenticateService.logout(refreshToken);
		return ok("Logged out successfully.");
	}
	

}
