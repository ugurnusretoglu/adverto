package com.ugur.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoLandIU extends DtoEstateIU{
	
	@NotNull
	private String landUse;
	
	@NotNull
	private BigDecimal squareMeter;
	
	@NotNull
	private BigDecimal pricePerSquareMeter;
	
	@NotNull
	private String blockNo;

	@NotNull
	private String parcelNo;
	
	@NotNull
	private String sheetNo;
	
	@NotNull
	private BigDecimal far;
	
	@NotNull
	private BigDecimal heightLimit;
}
