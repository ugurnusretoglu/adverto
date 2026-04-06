package com.ugur.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "estate")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Estate extends Advert {
		
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name = "country", column = @Column(name= "estate_country")),
		@AttributeOverride(name = "city", column = @Column(name= "estate_city")),
		@AttributeOverride(name = "district", column = @Column(name= "estate_district")),
		@AttributeOverride(name = "street", column = @Column(name= "estate_street"))
	})
	private Address address;
	
}
