package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.repository.devices.Prepare;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Map;
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

    public static ArrayList<Map<String, ?>> searchDevices(String searchContent) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference devicesRef = firestore.collection("Devices");

        // Tạo truy vấn (query) để tìm các tài liệu trong đó trường "name" chứa searchContent
        Query query = devicesRef.whereEqualTo("name", searchContent);

        // Thực hiện truy vấn
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot queryResult = querySnapshot.get();

        // List để lưu trữ kết quả
        ArrayList<Map<String, ?>> searchResults = new ArrayList<Map<String, ?>>();

        // Lặp qua kết quả truy vấn và chuyển đổi chúng thành đối tượng Devices
        for (QueryDocumentSnapshot document : queryResult) {
            searchResults.add(document.getData());
        }
        System.out.println(searchResults);
        return searchResults;
    }

    public static Map<String, ?> getInfoByID(String idToSearch) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference devicesRef = firestore.collection("Devices");
        Query query = devicesRef.whereEqualTo("id", idToSearch);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot queryResult = querySnapshot.get();
        if (!queryResult.isEmpty()) {
            return queryResult.getDocuments().get(0).getData();
        }
        System.out.println("check");
        return null;
    }
}
