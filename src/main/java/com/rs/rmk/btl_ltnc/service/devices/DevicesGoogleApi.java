package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.api.gax.batching.BatchingException;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.repository.devices.Prepare;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class DevicesGoogleApi {

    public static boolean addDevices(Devices devices) throws ExecutionException, InterruptedException {

        Prepare.prepareDevices(devices);
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection("Devices")
                .document(devices.getID());
        ApiFuture<WriteResult> result = docRef.set(devices);
        WriteResult writeResult = result.get();
        return writeResult != null;
    }
}
