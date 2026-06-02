package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Land;

@Repository
public interface LandRepository extends JpaRepository<Land, Long> { 

}
