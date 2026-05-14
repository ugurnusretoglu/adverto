package com.ugur.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.ugur.enums.AdStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoAdvert extends DtoBase {
	
	private String advertNumber;
	
	private String advertName;
	
	private BigDecimal price;
	
	private String description;
	
	private AdStatus adStatus;
	
	private List<DtoImage> images= new ArrayList<>();
}
