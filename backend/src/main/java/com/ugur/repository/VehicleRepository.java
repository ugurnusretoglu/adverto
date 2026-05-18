package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> { 

}
