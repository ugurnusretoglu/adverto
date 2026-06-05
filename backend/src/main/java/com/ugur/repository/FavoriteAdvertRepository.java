package com.ugur.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.Advert;
import com.ugur.model.FavoriteAdvert;
import com.ugur.model.User;

@Repository
public interface FavoriteAdvertRepository extends JpaRepository<FavoriteAdvert, Long>{ 
	
	Optional<FavoriteAdvert> findByUserAndAdvert(User user, Advert advert);
	
	List<FavoriteAdvert> findByUser(User user);
	
	boolean existsByUserAndAdvert(User user, Advert advert);
}
