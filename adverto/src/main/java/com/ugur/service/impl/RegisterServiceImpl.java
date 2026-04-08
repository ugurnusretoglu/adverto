package com.ugur.service.impl;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ugur.dto.DtoAddress;
import com.ugur.dto.DtoUser;
import com.ugur.dto.RegisterRequest;
import com.ugur.model.Address;
import com.ugur.model.User;
import com.ugur.repository.UserRepository;
import com.ugur.service.IRegisterService;

@Service
public class RegisterServiceImpl implements IRegisterService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private User createUser(RegisterRequest input) {
		User user = new User();
		Address address=new Address();
		address.setCountry(input.getAddress().getCountry());
		address.setCity(input.getAddress().getCity());
		address.setDistrict(input.getAddress().getDistrict());
		address.setStreet(input.getAddress().getStreet());
		user.setAddress(address);
		user.setCreatedAt(new Date());
		user.setFirstName(input.getFirstName());
		user.setLastName(input.getLastName());
		user.setUsername(input.getUsername());
		user.setEmail(input.getEmail());
		user.setPhone(input.getPhone());
		user.setPassword(passwordEncoder.encode(input.getPassword()));
		user.setBalance(input.getBalance());
		user.setBirthOfDate(input.getBirthOfDate());
		user.setAddress(address);
		
		return user;
	}
	
	@Override
	public DtoUser register(RegisterRequest input) {
		DtoUser dtoUser=new DtoUser();
		DtoAddress dtoAddress=new DtoAddress(); 
		
		User savedUser = userRepository.save(createUser(input));
		
		BeanUtils.copyProperties(savedUser, dtoUser);
		
		dtoAddress.setCountry(savedUser.getAddress().getCountry());
		dtoAddress.setCity(savedUser.getAddress().getCity());
		dtoAddress.setDistrict(savedUser.getAddress().getDistrict());
		dtoAddress.setStreet(savedUser.getAddress().getStreet());
		
		dtoUser.setAddress(dtoAddress);
		
		return dtoUser;
	}

}
