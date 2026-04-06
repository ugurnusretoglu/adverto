package com.ugur.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "password")
	private String password;
	
	@Embedded
	@AttributeOverrides({
		@AttributeOverride(name = "country", column = @Column(name= "user_country")),
		@AttributeOverride(name = "city", column = @Column(name= "user_city")),
		@AttributeOverride(name = "district", column = @Column(name= "user_district")),
		@AttributeOverride(name = "street", column = @Column(name= "user_street"))
	})
	private Address address;
	
	@Column(name = "balance", nullable = true)
	private BigDecimal balance;
	
	@Column(name = "birth_of_date")
	private Date birtOfDate;
	
	@Column(name = "profile_image_url,", nullable = true)
	private String profileImageUrl;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Advert> adverts = new ArrayList<>();
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Transaction> transactions = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RefreshToken> refreshTokens = new ArrayList<>();
}
