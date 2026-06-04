package com.ugur.service;

import java.util.List;

import com.ugur.dto.DtoAdvertSummary;

public interface IFavoriteAdvertService {
	
	void addFavorite(Long advertId);
	
	void removeFavorite(Long advertId);
	
	List<DtoAdvertSummary> getFavorites();
}
