package com.ugur.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoFuelConsumption extends DtoBase {
	
	private BigDecimal cityConsumption;
	
	private BigDecimal highwayConsumption;
	
	private BigDecimal averageConsumption;
	
	private BigDecimal fuelTankCapacity;	
}

