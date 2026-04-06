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
@Table(name = "engine")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Engine extends BaseEntity {
	
	@Column(name = "engine_type")
	private String engineType;
	
	@Column(name = "engine_Displacement")
	private BigDecimal engineDisplacement;
	
	@Column(name = "max_power")
	private String maxPower;
	
	@Column(name = "max_torque")
	private String maxTorque;
	
	@Column(name = "zero_to_hundred_acceleration")
	private BigDecimal zeroToHundredAcceleration;
	
	@Column(name = "top_speed")
	private Integer topSpeed;
	
}
