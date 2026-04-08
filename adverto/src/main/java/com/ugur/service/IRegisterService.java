package com.ugur.service;

import com.ugur.dto.DtoUser;
import com.ugur.dto.RegisterRequest;

public interface IRegisterService {
	
	public DtoUser register(RegisterRequest input);
	
}
