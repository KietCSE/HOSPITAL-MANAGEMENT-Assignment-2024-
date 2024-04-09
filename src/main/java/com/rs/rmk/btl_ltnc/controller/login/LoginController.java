package com.rs.rmk.btl_ltnc.controller.login;

import com.google.protobuf.Api;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.login.Datalogin;
import com.rs.rmk.btl_ltnc.repository.login.FirestoreLogin;
import com.rs.rmk.btl_ltnc.security.JWTresponse;
import com.rs.rmk.btl_ltnc.security.JWTtoken;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class LoginController {

    @PostMapping("/checkaccount")
    public ResponseEntity<JWTresponse> getAccountPassword(@RequestBody @Valid Datalogin data) throws FirestoreException {
        FirestoreLogin firestore = new FirestoreLogin();
        ApiResponse<String> apiResponse =firestore.CheckData(data, "User");

        // neu co ton tai trong database
        if (apiResponse.getStatus()) {
            JWTtoken jwTtoken = new JWTtoken();
            JWTresponse jwTresponse = new JWTresponse();
            jwTresponse.setStatus(true);
            // sinh ra token voi role tuong ung
            jwTresponse.setCode(jwTtoken.generateToken(data.getAccount(), apiResponse.getData()));
            return ResponseEntity.status(HttpStatus.OK).body(jwTresponse);
        }
        // neu khong ton tai
        else {
            JWTresponse jwTresponse = new JWTresponse();
            jwTresponse.setStatus(false);
            return ResponseEntity.badRequest().body(jwTresponse);
        }
    }

    @GetMapping("/myinfo")
    public Object getInfor() {
        var context = SecurityContextHolder.getContext().getAuthentication();
        ApiResponse<Authentication> response = new ApiResponse<>();
        response.setData(context);
        return response;
    }
}
