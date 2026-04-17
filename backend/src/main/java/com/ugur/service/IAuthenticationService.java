package com.ugur.service;

import com.ugur.dto.AuthenticateRequest;
import com.ugur.dto.AuthenticateResponse;
import com.ugur.dto.RefreshTokenRequest;

public interface IAuthenticationService {
	
	public AuthenticateResponse authenticate(AuthenticateRequest input);
	
	public AuthenticateResponse refreshToken(RefreshTokenRequest input);
	
	public void logout(String refreshToken);
}
