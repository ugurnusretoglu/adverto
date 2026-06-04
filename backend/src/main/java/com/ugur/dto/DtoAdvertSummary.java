package com.ugur.dto;

import java.math.BigDecimal;

import com.ugur.enums.AdStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoAdvertSummary extends DtoBase {
	
	private String advertName;
	
	private String description;
	
	private BigDecimal price;
	
	private AdStatus adStatus;
	
	private String coverImageUrl;
	
	private String advertType;
}
