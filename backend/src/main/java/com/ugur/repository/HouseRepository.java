package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.House;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> { 

}
