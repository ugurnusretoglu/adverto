package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Engine;

@Repository
public interface EngineRepository extends JpaRepository<Engine, Long> {

}
