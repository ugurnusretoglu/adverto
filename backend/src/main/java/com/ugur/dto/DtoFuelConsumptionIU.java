package com.ugur.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoFuelConsumptionIU {
	
	@NotNull
	private BigDecimal cityConsumption;
	
	@NotNull
	private BigDecimal highwayConsumption;
	
	@NotNull
	private BigDecimal averageConsumption;
	
	@NotNull
	private BigDecimal fuelTankCapacity;
}
