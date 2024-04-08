package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.api.gax.batching.BatchingException;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firestore.v1.Write;
import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.model.devices.Items;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class DevicesGoogleApi {

    public static boolean addDevices(Devices devices) throws ExecutionException, InterruptedException {

        LocalDateTime now = LocalDateTime.now();
        // Định dạng thời gian
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        // Chuyển đổi thời gian thành chuỗi với định dạng mong muốn
        String id = now.format(formatter);
        devices.setID(id);
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection("Devices").document(id);
        ApiFuture<WriteResult> result = docRef.set(devices);
        if (result.get() == null) return false;

        CollectionReference collectionReference = docRef.collection("Items");
        WriteBatch batch = firestore.batch();
        int itemNums = devices.getTotalAmount();
        for (int i = 0; i < itemNums; i++) {
            String newId = id + "_" + (i+1);
            Items item = new Items(newId, "kho", "stored");
            DocumentReference docRef2 = collectionReference.document(newId);
            batch.set(docRef2, item);
        }
        try {
            ApiFuture<List<WriteResult>> batchResult = batch.commit();
            for (WriteResult writeResult : batchResult.get()) {
                if (writeResult == null) return false;
            }
            return true;
        } catch (BatchingException e) {
            return false;
        }
    }
}
