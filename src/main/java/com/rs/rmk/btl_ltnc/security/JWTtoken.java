package com.rs.rmk.btl_ltnc.security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


// tao ra JWT
@Service
@Slf4j
public class JWTtoken {

    @NonFinal
    protected static final String key = "xRGK4LsZiU5ldkp/cyUqXPOLHElMXfGyu3B0RiK3L194R6kCPTopWhrORzoZNVSs";
    public String generateToken(String username, String scope) {

        // tao header va thuat toan
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // create payload which is the body of jwt
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("scope", scope)
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // build token with header and payload
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            // sign token with the key
            jwsObject.sign(new MACSigner(key.getBytes()));
            // return jwt
            String jwt = jwsObject.serialize();
            // save SecurityContextHolder
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info(authentication.toString());
            var a = SecurityContextHolder.getContext().getAuthentication();
            log.info(a.toString());

            return jwt;

        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    // kiểm tra jwt có hợp lệ hay không
    public Boolean introspect(String requestToken) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(key.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(requestToken);
        //kiểm tra jwt có hết hạn ko
        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        log.info(String.valueOf(expityTime.after(new Date())));
        //kiểm tra jwt có đúng với thuật toán mã hóa không
        var confirm = signedJWT.verify(verifier);
        log.info(String.valueOf(confirm));
        //trả vê
        return confirm && expityTime.after(new Date());
    }

}

