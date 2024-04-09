package com.rs.rmk.btl_ltnc.repository.doctorInfoRepository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class doctorInfoRepository {
    public doctorInfoModel getDoctorInfo(String doctorName) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        DocumentReference doctorRef = database.collection("Doctor").document(doctorName);
        ApiFuture<DocumentSnapshot> future = doctorRef.get();
        DocumentSnapshot snapshot = future.get();
        if (snapshot.exists()) {
            return snapshot.toObject(doctorInfoModel.class);
        }
        else {
            return null;
        }
    }

    public doctorInfoModel addDoctorInfo(doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = database.collection("Doctor").document(doctorInfoModel.getDoctorNameCode()).set(doctorInfoModel);
        return doctorInfoModel;
    }
}
