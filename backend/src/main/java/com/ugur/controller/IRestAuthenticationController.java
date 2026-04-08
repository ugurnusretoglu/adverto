package com.ugur.controller;

import com.ugur.dto.AuthenticateRequest;
import com.ugur.dto.AuthenticateResponse;
import com.ugur.dto.RefreshTokenRequest;

public interface IRestAuthenticationController {
	
	public RootEntity<AuthenticateResponse> authenticate(AuthenticateRequest input);
	
	public RootEntity<AuthenticateResponse> refreshToken(RefreshTokenRequest input);
}
