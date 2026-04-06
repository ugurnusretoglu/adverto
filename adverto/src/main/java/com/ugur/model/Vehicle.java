package com.ugur.model;

import com.ugur.enums.BodyType;
import com.ugur.enums.FuelType;
import com.ugur.enums.TransmissionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehicle")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle extends Advert {
	
	@Column(name = "vehicle_type")
	private String vehicleType;
	
	@Column(name = "brand")
	private String brand;
	
	@Column(name = "series")
	private String series;
	
	@Column(name = "model")
	private String model;
	
	@Column(name = "model_year")
	private Integer modelYear;
	
	@Column(name = "fuel_type")
	@Enumerated(EnumType.STRING)
	private FuelType fuelType;
	
	@Column(name = "transmission_type")
	@Enumerated(EnumType.STRING)
	private TransmissionType transmissionType;
	
	@Column(name = "body_type")
	@Enumerated(EnumType.STRING)
	private BodyType bodyType;
	
	@Column(name = "mileage")
	private Integer mileage;
	
	@Column(name = "drive_type")
	private String driveType;
	
	@Column(name = "color")
	private String color;
	
	@Column(name = "severe_damage_record")
	private Boolean severeDamageRecord;
	
	@Column(name = "plate_no")
	private String plateNo;
	
	@OneToOne(optional = true)
	@JoinColumn(name = "engine_id", nullable = true)
	private Engine engine;
	
	@OneToOne(optional = true)
	@JoinColumn(name = "fuelConsumption_id")
	private FuelConsumption fuelConsumption;
	
}
