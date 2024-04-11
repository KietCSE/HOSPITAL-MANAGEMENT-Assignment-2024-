package com.rs.rmk.btl_ltnc.repository.patient;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
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




    public Boolean deletePatient(String collection, String documentID) throws FirestoreException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection(collection).document(documentID);

        try {
            // Kiểm tra document có tồn tại không
            ApiFuture<DocumentSnapshot> docSnapshotFuture = docRef.get();
            DocumentSnapshot documentSnapshot = docSnapshotFuture.get();

            if (documentSnapshot.exists()) {
                // Document tồn tại, thực hiện xóa và đợi kết quả
                ApiFuture<WriteResult> writeResult = docRef.delete();
                writeResult.get(); // Đợi kết quả
                return true; // Xóa thành công
            } else {
                // Document không tồn tại
                return false;
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new FirestoreException(ErrorFirestore.NOT_DELETE_DATA);
        }
    }
}
