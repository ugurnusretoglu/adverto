package com.ugur.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ugur.controller.IRestFavoriteAdvertController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoAdvertSummary;
import com.ugur.service.IFavoriteAdvertService;

@RestController
@RequestMapping("/rest/api/favorite")
public class RestFavoriteAdvertImpl extends RestBaseController implements IRestFavoriteAdvertController {
	
	@Autowired
	private IFavoriteAdvertService iFavoriteAdvertService;
	
	@PostMapping("/{advertId}")
	@Override
	public RootEntity<Void> addFavorite(@PathVariable Long advertId) {
		iFavoriteAdvertService.addFavorite(advertId);
		return ok(null);
	}
	
	@DeleteMapping("/{advertId}")
	@Override
	public RootEntity<Void> removeFavorite(@PathVariable Long advertId) {
		iFavoriteAdvertService.removeFavorite(advertId);
		return ok(null);
	}

	@GetMapping
	@Override
	public RootEntity<List<DtoAdvertSummary>> getFavorites() {
		return ok(iFavoriteAdvertService.getFavorites());
	}
}
