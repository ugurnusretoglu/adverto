package com.ugur.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoUser extends DtoBase {

	private String firstName;
	
	private String lastName;
	
	private String username;
	
	private String email;
	
	private String phone;
	
	private String password;
	
	private DtoAddress address;
	
	private BigDecimal balance;
	
	private LocalDate birthOfDate;
}
