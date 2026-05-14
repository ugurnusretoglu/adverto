package com.ugur.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
