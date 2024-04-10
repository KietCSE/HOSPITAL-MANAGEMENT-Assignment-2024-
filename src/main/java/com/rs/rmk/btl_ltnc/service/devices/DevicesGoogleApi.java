package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.model.devices.DevicesApiResponse;
import com.rs.rmk.btl_ltnc.repository.devices.Prepare;

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

    public static ArrayList<Map<String, ?>> getInfoByID(String idToSearch) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference devicesRef = firestore.collection("Devices");

        // Tạo truy vấn (query) để tìm các tài liệu trong đó trường "name" chứa searchContent
        Query query = devicesRef.whereEqualTo("id", idToSearch);

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

    public static boolean updateItem(String itemID, String Act, String Location) throws ExecutionException, InterruptedException {

        int indexOfUnderscore = itemID.indexOf('_'); // Tìm vị trí của ký tự '_'
        String ID = itemID.substring(0, indexOfUnderscore);
        int indexOfItem = Integer.parseInt(itemID.substring(indexOfUnderscore + 1 ));

        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference devicesRef = firestore.collection("Devices");
        Query query = devicesRef.whereEqualTo("id", ID);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot queryResult = querySnapshot.get();
        if (queryResult.isEmpty()) {
            return false;
        } else {
            QueryDocumentSnapshot document = queryResult.getDocuments().get(0);
            DevicesApiResponse devices = document.toObject(DevicesApiResponse.class);
            DevicesApiResponse.Item item = devices.getItemsList().get(indexOfItem);
            System.out.println(item);
            String lastState = item.getState();
            if (Act.equalsIgnoreCase("Use")) {
                item.setState("in use");
                item.setLocated(Location);
                if (lastState.equals("stored")) {
                    devices.setInUseAmount(devices.getInUseAmount() + 1);
                    devices.setStoredAmount(devices.getStoredAmount() - 1);
                }
            } else {
                item.setState("damaged");
                item.setLocated("kho-hỏng");
                if (lastState.equals("in use")) {
                    devices.setInUseAmount(devices.getInUseAmount() - 1);
                    devices.setDamagedAmount(devices.getDamagedAmount() + 1);
                } else {
                    devices.setStoredAmount(devices.getInUseAmount() - 1);
                    devices.setDamagedAmount(devices.getDamagedAmount() + 1);
                }
            }
            //Đưa devices đã được thay đổi lên lại firestore
            DocumentReference docRef = firestore.collection("Devices")
                    .document(devices.getId());
            ApiFuture<WriteResult> result = docRef.set(devices);
            WriteResult writeResult = result.get();
            return writeResult != null;
        }
    }
}
