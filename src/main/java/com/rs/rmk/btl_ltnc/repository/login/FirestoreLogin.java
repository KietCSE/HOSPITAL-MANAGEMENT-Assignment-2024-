package com.rs.rmk.btl_ltnc.repository.login;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.login.Datalogin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Slf4j
public class FirestoreLogin {

    // check tai khoan mat khau co ton tai trong database khong
    // neu co tra ve true kem voi role
    // neu khong tra ve false
    public ApiResponse<String> CheckData(Datalogin user, String collection) throws FirestoreException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        // documentID = userAccount
        DocumentReference docRef = dbFirestore.collection(collection).document(user.getAccount());
        ApiFuture<DocumentSnapshot> future = docRef.get();
        try {
            DocumentSnapshot documentSnapshot = future.get();

            ApiResponse<String> apiResponse = new ApiResponse<>();
            boolean hasAccount;
            if (documentSnapshot.exists()) {
                // kiem tra mat khau co giong nhau khong
                PasswordEncoder encoder = new BCryptPasswordEncoder(10);
                log.info(user.getPassword());
                hasAccount = encoder.matches(user.getPassword(), documentSnapshot.getString("password"));
                log.info(String.valueOf(hasAccount));

                apiResponse.setData(documentSnapshot.getString("role"));
                apiResponse.setStatus(hasAccount);
            }
            else apiResponse.setStatus(false);

            return apiResponse;

        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.DOCUMENT_NOT_FOUND);
        }
    }
}
