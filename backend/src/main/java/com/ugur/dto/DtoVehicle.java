package com.ugur.dto;

import com.ugur.enums.BodyType;
import com.ugur.enums.FuelType;
import com.ugur.enums.TransmissionType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoVehicle extends DtoAdvert {
	
	private String vehicleType;
	
	private String brand;
	
	private String series;
	
	private String model;
	
	private Integer modelYear;
	
	private FuelType fuelType;
	
	private TransmissionType transmissionType;
	
	private BodyType bodyType;
	
	private Integer mileage;
	
	private String driveType;
	
	private String color;
	
	private Boolean severeDamageRecord;
	
	private String plateNo;

	private DtoEngine engine;

	private DtoFuelConsumption fuelConsumption;

}
