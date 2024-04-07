package com.rs.rmk.btl_ltnc.controller.login;

import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.login.Datalogin;
import com.rs.rmk.btl_ltnc.repository.login.FirestoreLogin;
import com.rs.rmk.btl_ltnc.security.JWTresponse;
import com.rs.rmk.btl_ltnc.security.JWTtoken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/checkaccount")
    public ResponseEntity<JWTresponse> getAccountPassword(@RequestBody Datalogin data) throws FirestoreException {
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
}
