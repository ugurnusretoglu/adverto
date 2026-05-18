package com.ugur.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoEngineUI {
	
	@NotNull
	private String engineType;
	
	@NotNull
	private BigDecimal engineDisplacement;
	
	@NotNull
	private String maxPower;
	
	@NotNull
	private String maxTorque;
	
	@NotNull
	private BigDecimal zeroToHundredAcceleration;
	
	@NotNull
	private Integer topSpeed;
	
}
