package com.ugur.dto;

import com.ugur.enums.BodyType;
import com.ugur.enums.FuelType;
import com.ugur.enums.TransmissionType;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoVehicleIU extends DtoAdvertIU {
	
	@NotNull
	private String vehicleType;
	
	@NotNull
	private String brand;
	
	@NotNull
	private String series;
	
	@NotNull
	private String model;
	
	@NotNull
	private Integer modelYear;
	
	@NotNull
	private FuelType fuelType;
	
	@NotNull
	private TransmissionType transmissionType;
	
	@NotNull
	private BodyType bodyType;
	
	@NotNull
	private Integer mileage;
	
	@NotNull
	private String driveType;
	
	@NotNull
	private String color;
	
	@NotNull
	private Boolean severeDamageRecord;
	
	@NotNull
	private String plateNo;
	
}
