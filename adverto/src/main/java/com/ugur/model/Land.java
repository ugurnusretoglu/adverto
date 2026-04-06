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
@Table(name = "land")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Land extends Estate {
	
	@Column(name = "land_use")
	private String LandUse;
	
	@Column(name = "square_meter")
	private BigDecimal squareMeter;
	
	@Column(name = "price_per_square_meter")
	private BigDecimal pricePerSquareMeter;
	
	@Column(name = "block_no")
	private String blockNo;
	
	@Column(name = "parcel_no")
	private String parcelNo;
	
	@Column(name = "sheet_no")
	private String sheetNo;
	
	@Column(name = "far")
	private BigDecimal far;
	
	@Column(name = "height_limit")
	private BigDecimal heightLimit;
	
}
