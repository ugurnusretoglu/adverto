package com.ugur.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoLand extends DtoEstate {
	
	private String landUse;
	
	private BigDecimal squareMeter;
	
	private BigDecimal pricePerSquareMeter;
	
	private String blockNo;

	private String parcelNo;
	
	private String sheetNo;
	
	private BigDecimal far;
	
	private BigDecimal heightLimit;
}	
