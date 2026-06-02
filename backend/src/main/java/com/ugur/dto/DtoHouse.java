package com.ugur.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoHouse extends DtoEstate {
	
	private Integer totalArea;
	
	private Integer netArea;
	
	private String rooms;
	
	private Integer age;
	
	private String floor;
	
	private Integer totalFloors;
	
	private String heating;
	
	private Integer bathrooms;
	
	private String kitchen;
	
	private Boolean balcony;
	
	private Boolean elevator;
}
