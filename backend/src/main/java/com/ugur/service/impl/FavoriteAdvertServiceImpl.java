package com.ugur.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ugur.dto.DtoAdvertSummary;
import com.ugur.exception.BaseException;
import com.ugur.exception.ErrorMessage;
import com.ugur.exception.MessageType;
import com.ugur.model.Advert;
import com.ugur.model.FavoriteAdvert;
import com.ugur.model.House;
import com.ugur.model.Land;
import com.ugur.model.User;
import com.ugur.model.Vehicle;
import com.ugur.repository.AdvertRepository;
import com.ugur.repository.FavoriteAdvertRepository;
import com.ugur.service.IFavoriteAdvertService;

@Service
public class FavoriteAdvertServiceImpl implements IFavoriteAdvertService {
	
	@Autowired
	private FavoriteAdvertRepository favoriteAdvertRepository;
	
	@Autowired
	private AdvertServiceImpl advertServiceImpl;
	
	@Autowired
	private AdvertRepository advertRepository;
	
	@Override
	public void addFavorite(Long advertId) {
		User user = advertServiceImpl.getCurrentUser();
		
		Advert advert = advertRepository.findById(advertId)
				.orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NO_RECORD_EXIST, advertId.toString())));
		
		if(!favoriteAdvertRepository.existsByUserAndAdvert(user, advert)) {
			FavoriteAdvert favoriteAdvert = new FavoriteAdvert();
			favoriteAdvert.setUser(user);
			favoriteAdvert.setAdvert(advert);
			favoriteAdvert.setCreatedAt(new Date());
			favoriteAdvertRepository.save(favoriteAdvert);
		}
	}

	@Override
	public void removeFavorite(Long advertId) {
		User user = advertServiceImpl.getCurrentUser();
        Advert advert = advertRepository.findById(advertId)
                .orElseThrow(() -> new BaseException(
                    new ErrorMessage(MessageType.NO_RECORD_EXIST, advertId.toString())));
        
        favoriteAdvertRepository.findByUserAndAdvert(user, advert)
        		.ifPresent(favoriteAdvertRepository::delete);
	}

	@Override
	public List<DtoAdvertSummary> getFavorites() {
		User user = advertServiceImpl.getCurrentUser();
		List<FavoriteAdvert> favorites = favoriteAdvertRepository.findByUser(user);
		
		return favorites.stream().map(fav -> {
            Advert advert = fav.getAdvert();
            DtoAdvertSummary summary = new DtoAdvertSummary();
            BeanUtils.copyProperties(advert, summary);
            summary.setAdStatus(advert.getAdStatus());

            if (advert.getImages() != null && !advert.getImages().isEmpty()) {
                summary.setCoverImageUrl(advert.getImages().get(0).getUrl());
            }

            if (advert instanceof Vehicle) {
                summary.setAdvertType("VEHICLE");
            } else if (advert instanceof House) {
                summary.setAdvertType("HOUSE");
            } else if (advert instanceof Land) {
                summary.setAdvertType("LAND");
            }

            return summary;
        }).toList();
	} 
}
