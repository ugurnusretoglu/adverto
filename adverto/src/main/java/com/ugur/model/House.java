package com.ugur.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "house")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class House extends Estate {
	
	@Column(name = "total_area")
	private Integer totalArea;
	
	@Column(name = "net_area")
	private Integer netArea;
	
	@Column(name = "rooms")
	private String rooms;
	
	@Column(name = "age")
	private Integer age;
	
	@Column(name = "floor")
	private String floor;
	
	@Column(name = "totol_floors")
	private Integer totolFloors;
	
	@Column(name= "heating")
	private String heating;
	
	@Column(name = "bathrooms")
	private Integer bathrooms;
	
	@Column(name = "kitchen")
	private String kitchen;
	
	@Column(name ="balcony")
	private Boolean balcony;
	
	@Column(name = "elevator")
	private Boolean elevator;
}
