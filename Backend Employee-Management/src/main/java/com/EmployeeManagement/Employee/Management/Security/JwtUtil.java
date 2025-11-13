package com.EmployeeManagement.Employee.Management.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    //secreat key to singn on the token
    @Value("${jwt.secret}")
    private String SECRET_KEY ;

    @Value("${jwt.expirationMs}")
    private long expirationMs;



    //    Genrate the token for user
    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();
        return generateToken(claims, username);
    }

//    create token
    public String generateToken(Map<String, Object> claims, String subject){
//        long expirationTime = 1000*60*60*24;
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

//    Extract username from token
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

//    Extratct signle clime
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims=extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

//    validate token
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

//    validet token
    public  boolean validateToken(String token, String username){
        final String extractUsername = extractUsername(token);
        return (extractUsername.equals(username) && !isTokenExpired(token));
    }

//    check the token expired
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date(System.currentTimeMillis()));
    }

//    extract Date expiraton
    private  Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }


    // Generate signing key
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
