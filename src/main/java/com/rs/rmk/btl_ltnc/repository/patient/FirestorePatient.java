package com.rs.rmk.btl_ltnc.repository.patient;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.patientinfo.info;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class FirestorePatient {
    public List<Map<String, Object>> getPateintList(String collection) throws FirestoreException {
        Firestore db = FirestoreClient.getFirestore();
        List<Map<String,Object>> patientList = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(collection).get();
            QuerySnapshot querySnapshot = future.get();
            for (QueryDocumentSnapshot document : querySnapshot) {
                Map<String, Object> TodoData = document.getData();
                patientList.add(TodoData);
            }
            return patientList;
        }
        catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_COLLECTION_DATA);
        }
    }

    public Boolean postPatient(String collection, info patient) throws  FirestoreException {
        try {
            Firestore db = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> apiFuture = db.collection(collection).document(patient.getId()).set(patient);
            WriteResult writeResult = apiFuture.get();
            return writeResult != null;
        }
        catch ( ExecutionException | InterruptedException exception) {
            throw new FirestoreException(ErrorFirestore.NOT_STORE_DATA);
        }

    }


}
