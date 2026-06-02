package com.ugur.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoHouseIU extends DtoEstateIU {
	
	@NotNull
	private Integer totalArea;
	
	@NotNull
	private Integer netArea;
	
	@NotNull
	private String rooms;
	
	@NotNull
	private Integer age;
	
	@NotNull
	private String floor;
	
	@NotNull
	private Integer totalFloors;
	
	@NotNull
	private String heating;
	
	@NotNull
	private Integer bathrooms;
	
	@NotNull
	private String kitchen;
	
	@NotNull
	private Boolean balcony;
	
	@NotNull
	private Boolean elevator;
}
