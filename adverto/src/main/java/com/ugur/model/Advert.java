package com.ugur.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.ugur.enums.AdStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Advert extends BaseEntity {
	
	@Column(name = "advert_number")
	private String advertNumber;
	
	@Column(name = "advert_name")
	private String advertName;
	
	@Column(name = "price")
	private BigDecimal price;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "ad_status")
	@Enumerated(EnumType.STRING)
	private AdStatus adStatus;
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "advert_id")
	private List<Image> images= new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "advert")
	private List<Transaction> transactions = new ArrayList<>();
}