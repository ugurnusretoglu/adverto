package com.ugur.dto;

import java.math.BigDecimal;

import com.ugur.enums.AdStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoAdvertIU {
	
	@NotNull
	private String advertNumber;
	
	@NotNull
	private String advertName;
	
	@NotNull
	private BigDecimal price;
	
	@NotNull
	private String description;
	
	@NotNull
	private AdStatus adStatus;
}
