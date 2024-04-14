package com.rs.rmk.btl_ltnc.repository.doctorInfoRepository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class doctorInfoRepository {
    public List<doctorInfoModel> getDoctorList() throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = database.collection("Doctor").get();
        QuerySnapshot query = querySnapshotApiFuture.get();
        List<doctorInfoModel> doctorInfoModels = new ArrayList<>();
        for (QueryDocumentSnapshot document : query) {
            doctorInfoModels.add(document.toObject(doctorInfoModel.class));
        }
        return doctorInfoModels;
    }

    public List<String> getListDoctorID(String departmentName) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = database.collection("Doctor").whereEqualTo("departmentName", departmentName).get();
        QuerySnapshot query = querySnapshotApiFuture.get();
        List<String> doctorIDs = new ArrayList<>();
        for (QueryDocumentSnapshot document : query) {
            doctorIDs.add(document.getId());
        }
        return doctorIDs;
    }

    public doctorInfoModel getDoctorInfo(String doctorID) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        DocumentReference doctorRef = database.collection("Doctor").document(doctorID);
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
        ApiFuture<WriteResult> writeResult = database.collection("Doctor").document(doctorInfoModel.getId()).set(doctorInfoModel);
        return doctorInfoModel;
    }

    public doctorInfoModel updateDoctorInfo(String doctorID, Map<String, Object> update) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        DocumentReference doctorRef = database.collection("Doctor").document(doctorID);
        ApiFuture<WriteResult> writeResult = doctorRef.update(update);
        return getDoctorInfo(doctorID);
    }

    public boolean deleteDoctorInfo(String doctorID) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        DocumentReference doctorRef = database.collection("Doctor").document(doctorID);
        ApiFuture<WriteResult> writeResult = doctorRef.delete();
        return true;
    }
}