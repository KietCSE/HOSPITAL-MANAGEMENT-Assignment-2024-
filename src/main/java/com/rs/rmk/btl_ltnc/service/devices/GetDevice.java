package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.devices.DevicesApiResponse;
import com.rs.rmk.btl_ltnc.repository.devices.GetListByID;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class GetDevice {
    private static final String COLLECTION_NAME = "Devices";

    public static List<DevicesApiResponse> getAllDevice() throws FirestoreException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        List<DevicesApiResponse> devicesList = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> querySnapshotApiFuture = dbFirestore.collection(COLLECTION_NAME).get();
            List<QueryDocumentSnapshot> queryDocumentSnapshots = querySnapshotApiFuture.get().getDocuments();
            for (QueryDocumentSnapshot queryDocumentSnapshot : queryDocumentSnapshots) {
                DevicesApiResponse devicesApiResponse = queryDocumentSnapshot.toObject(DevicesApiResponse.class);
                devicesList.add(devicesApiResponse);
            }
            return devicesList;
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_COLLECTION_DATA);
        }
    }

    // Get from GG Firebase
    public static List<DevicesApiResponse> getDevice(String rID) throws FirestoreException {
        List<DevicesApiResponse> list = getAllDevice();
        if(list == null) throw new FirestoreException(ErrorFirestore.NOT_GET_DOCUMENT);
        return GetListByID.getList(rID, list);
    }
}
