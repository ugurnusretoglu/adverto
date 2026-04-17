package com.ugur.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.ugur.dto.AuthenticateRequest;
import com.ugur.dto.AuthenticateResponse;
import com.ugur.dto.RefreshTokenRequest;
import com.ugur.exception.BaseException;
import com.ugur.exception.ErrorMessage;
import com.ugur.exception.MessageType;
import com.ugur.jwt.JWTService;
import com.ugur.model.RefreshToken;
import com.ugur.model.User;
import com.ugur.repository.RefreshTokenRepository;
import com.ugur.repository.UserRepository;
import com.ugur.service.IAuthenticationService;

@Service
public class AuthenticationServiceImpl implements IAuthenticationService {
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	private RefreshToken createRefreshToken(User user) {
		RefreshToken refreshToken=new RefreshToken();
		
		refreshToken.setCreatedAt(new Date());
		refreshToken.setExpiredDate(new Date(System.currentTimeMillis() + 1000*60*60*6));
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken.setRevoked(false);
		refreshToken.setUser(user);
		
		return refreshToken;
	}
	
	
	@Override
	public AuthenticateResponse authenticate(AuthenticateRequest input) {
		
		try {
			UsernamePasswordAuthenticationToken authenticationToken =
					new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword());
			authenticationProvider.authenticate(authenticationToken);
			
			Optional<User> optUser = userRepository.findByUsername(input.getUsername());
			String accessToken = jwtService.generateToken(optUser.get());
			RefreshToken savedRefreshToken = refreshTokenRepository.save(createRefreshToken(optUser.get())); 
			
			return new AuthenticateResponse(accessToken, savedRefreshToken.getRefreshToken());
			
		} catch (Exception e) {
			throw new BaseException(new ErrorMessage(MessageType.USERNAME_OR_PASSWORD_INVALID, e.getMessage()));
		}
	}
	
	private boolean isValidRefreshToken(Date expiredDate) {
		return new Date().before(expiredDate);
	}
	
	@Override
	public AuthenticateResponse refreshToken(RefreshTokenRequest input) {
		Optional<RefreshToken> optRefreshToken = refreshTokenRepository.findByRefreshToken(input.getRefreshToken());
		if(optRefreshToken.isEmpty()) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_NOT_FOUND, input.getRefreshToken()));
		}
		
		if(optRefreshToken.get().getRevoked()) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_IS_REVOKED, input.getRefreshToken()));
		}
		
		if(!isValidRefreshToken(optRefreshToken.get().getExpiredDate())) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_IS_EXPIRED, input.getRefreshToken()));
		}
		
		User user = optRefreshToken.get().getUser();
		String accessToken = jwtService.generateToken(user);
		RefreshToken savedRefreshToken = refreshTokenRepository.save(createRefreshToken(user));
		
		return new AuthenticateResponse(accessToken, savedRefreshToken.getRefreshToken());
	}


	@Override
	public void logout(String refreshToken) {
		Optional<RefreshToken> optRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken);
		
		if(optRefreshToken.isEmpty()) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_NOT_FOUND, refreshToken));
		}
		
		List<RefreshToken> activeTokens = refreshTokenRepository.findAllByUserIdAndRevokedFalse(optRefreshToken.get().getUser().getId());
		
		for (RefreshToken refToken : activeTokens) {
			refToken.setRevoked(true);
		}
		
		refreshTokenRepository.saveAll(activeTokens);
		
	}

}
