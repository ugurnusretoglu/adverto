package com.ugur.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ugur.model.RefreshToken;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	
	Optional<RefreshToken> findByRefreshToken(String refreshToken);
	
	public List<RefreshToken> findAllByUserIdAndRevokedFalse(Long userId);
}
