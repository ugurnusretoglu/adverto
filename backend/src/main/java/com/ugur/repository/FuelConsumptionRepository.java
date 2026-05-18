package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.FuelConsumption;

@Repository
public interface FuelConsumptionRepository extends JpaRepository<FuelConsumption, Long> { 

}
