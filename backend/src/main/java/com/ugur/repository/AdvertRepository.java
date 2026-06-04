package com.ugur.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ugur.model.Advert;

@Repository
public interface AdvertRepository extends JpaRepository<Advert, Long> { 
	
	@Query("SELECT a from Advert a LEFT JOIN FETCH a.images WHERE a.adStatus = 'ACTIVE'")
	List<Advert> findAllWithImages();
}
