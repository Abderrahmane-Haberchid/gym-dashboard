package com.gym_backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    public String extractJwtEmail(String token) {
        return null;
    }
    private static final String SECURE_KEY = "c18fdd4eae23cdd1d502a3f2dcfc0a9fa2f3592ff92e20150ec415b271d7c6a0";
    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = getAllClaims(token);
        return claimResolver.apply(claims);
    }
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*24))
                .signWith(getSinginKey(), SignatureAlgorithm.ES256)
                .compact();
    }
    private Claims getAllClaims(String token){
        return Jwts
                .parserBuilder()
                .build()
                .setSigningKey(getSinginKey())
                .parseClaimsJwt(token)
                .getBody();
    }

    private Key getSinginKey() {
        byte[]  keyBytes = Decoders.BASE64.decode(SECURE_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
