package com.ugur.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "fuel_consumption")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FuelConsumption extends BaseEntity {
	
	@Column(name = "city_consumption")
	private BigDecimal cityConsumption;
	
	@Column(name = "highway_consumption")
	private BigDecimal highwayConsumption;
	
	@Column(name = "average_consumption")
	private BigDecimal averageConsumption;
	
	@Column(name = "capacity")
	private BigDecimal fuelTankCapacity;
}
