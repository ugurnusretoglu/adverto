package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Estate;

@Repository
public interface EstateRepository extends JpaRepository<Estate, Long> { 

}
