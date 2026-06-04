package com.ugur.controller;

import java.util.List;

import com.ugur.dto.DtoAdvertSummary;

public interface IRestFavoriteAdvertController {
	
	public RootEntity<Void> addFavorite(Long advertId);
	
	public RootEntity<Void> removeFavorite(Long advertId);
	
	public RootEntity<List<DtoAdvertSummary>> getFavorites();
}