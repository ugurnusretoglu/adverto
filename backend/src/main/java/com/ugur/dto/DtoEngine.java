package com.ugur.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoEngine extends DtoBase {
	
	private String engineType;
	
	private BigDecimal engineDisplacement;
	
	private String maxPower;
	
	private String maxTorque;
	
	private BigDecimal zeroToHundredAcceleration;
	
	private Integer topSpeed;
	
}
