package com.ugur.controller;

import com.ugur.dto.DtoUser;
import com.ugur.dto.RegisterRequest;

public interface IRestRegisterController {

	public RootEntity<DtoUser> register(RegisterRequest input);
	
}
