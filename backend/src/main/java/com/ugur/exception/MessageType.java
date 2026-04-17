package com.ugur.exception;

import lombok.Getter;

@Getter
public enum MessageType {
	
	NO_RECORD_EXIST("1004", "No record found!"),
	TOKEN_IS_EXPIRED("1005", "The token has expired!"),
	USERNAME_NOT_FOUND("1006", "username not found!"),
	USERNAME_OR_PASSWORD_INVALID("1007","Username or password is incorrect!"),
	REFRESH_TOKEN_NOT_FOUND("1008","Refresh token not found!"),
	REFRESH_TOKEN_IS_EXPIRED("1009", "The Refresh token has expired!"),
	REFRESH_TOKEN_IS_REVOKED("1010", "Refresh token invalid!"),
	GENERAL_EXCEPTION("9999", "A general error occurred!");
	
	private String code;
	private String message;
	
	MessageType(String code, String message){
		this.code=code;
		this.message=message;
	}
}
