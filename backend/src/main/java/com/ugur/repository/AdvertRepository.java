package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Advert;

@Repository
public interface AdvertRepository extends JpaRepository<Advert, Long> { 

}
