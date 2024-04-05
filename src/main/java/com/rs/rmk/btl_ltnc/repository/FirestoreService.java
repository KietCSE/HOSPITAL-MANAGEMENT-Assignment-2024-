package com.rs.rmk.btl_ltnc.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.concurrent.ExecutionException;

@Repository
public class FirestoreService {

    // Store data in a collection with DocumentId = data_time, return true if store successfully, false if not
    public Boolean createData(Object data, String collection) throws FirestoreException {
        try {
            LocalTime now = LocalTime.now();
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(collection).document(now.toString()).set(data);
            WriteResult writeResult = collectionApiFuture.get();
            return writeResult != null;
        } catch (InterruptedException | ExecutionException e) {
            throw new FirestoreException(ErrorFirestore.NOT_STORE_DATA);
        }
    }



}
