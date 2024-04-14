package com.rs.rmk.btl_ltnc.service.devices;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.model.devices.DevicesApiResponse;
import com.rs.rmk.btl_ltnc.repository.devices.Prepare;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
        return searchResults;
    }

    public static boolean updateItem(String itemID, String Act, String Location) throws ExecutionException, InterruptedException {

        int indexOfUnderscore = itemID.indexOf('_'); // Tìm vị trí của ký tự '_'
        String ID = itemID.substring(0, indexOfUnderscore);

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
            int indexOfItem = devices.indexOfItem(itemID);
            if (indexOfItem == -1) {return false;}
            DevicesApiResponse.Item item = devices.getItemsList().get(indexOfItem);

            String lastState = item.getState();
            if (Act.equalsIgnoreCase("Use")) {
                item.setState("in use");
                item.setLocated(Location);
                if (lastState.equals("stored")) {
                    devices.setInUseAmount(devices.getInUseAmount() + 1);
                    devices.setStoredAmount(devices.getStoredAmount() - 1);
                }
            } else if (Act.equalsIgnoreCase("Broken")){
                item.setState("damaged");
                item.setLocated("kho-hỏng");
                if (lastState.equals("in use")) {
                    devices.setInUseAmount(devices.getInUseAmount() - 1);
                    devices.setDamagedAmount(devices.getDamagedAmount() + 1);
                } else {
                    devices.setStoredAmount(devices.getStoredAmount() - 1);
                    devices.setDamagedAmount(devices.getDamagedAmount() + 1);
                }
            } else if (Act.equalsIgnoreCase("DeleteItem")) {
                devices.getItemsList().remove(indexOfItem);
                devices.setTotalAmount(devices.getTotalAmount() - 1);
                devices.setDamagedAmount(devices.getDamagedAmount() - 1);
            } else {return false;}
            //Đưa devices đã được thay đổi lên lại firestore
            DocumentReference docRef = firestore.collection("Devices")
                    .document(devices.getId());
            ApiFuture<WriteResult> result = docRef.set(devices);
            WriteResult writeResult = result.get();
            return writeResult != null;
        }
    }

    public static boolean saveUpdateLog(String id) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference devicesRef = firestore.collection("Devices");
        Query query = devicesRef.whereEqualTo("id", id);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        QuerySnapshot queryResult = querySnapshot.get();
        if (queryResult.isEmpty()) {
            return false;
        } else {
            LocalDate currentDate = LocalDate.now();
            String dateUpdate = currentDate.format(DateTimeFormatter.ISO_LOCAL_DATE);

            QueryDocumentSnapshot document = queryResult.getDocuments().get(0);
            DevicesApiResponse devices = document.toObject(DevicesApiResponse.class);
            //tạo mục mới trong nhật ký
            DevicesApiResponse.Update update = new DevicesApiResponse.Update();
            update.setDate(dateUpdate); update.setTotalAmount(devices.getTotalAmount());
            update.setDamagedAmount(devices.getDamagedAmount());
            update.setInUseAmount(devices.getInUseAmount());
            update.setStoredAmount(devices.getStoredAmount());
            //thêm mục mới vào nhật ký
            devices.getUpdateLog().add(update);
            //Đưa devices đã được thay đổi lên lại firestore
            DocumentReference docRef = firestore.collection("Devices")
                    .document(devices.getId());
            ApiFuture<WriteResult> result = docRef.set(devices);
            WriteResult writeResult = result.get();
            return writeResult != null;
        }
    }

    public static boolean deleteDevice(String id) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference docRef = firestore.collection("Devices").document(id);
        ApiFuture<WriteResult> result = docRef.delete(); // Thực hiện xóa document
        // Chờ đợi kết quả của việc xóa document
        return result.get() != null;
    }

    public static Map<String, Map<String, Integer>> fullDevicesInRooms() throws ExecutionException, InterruptedException {
        Map<String, Map<String, Integer>> devicesInRooms = new HashMap<String, Map<String, Integer>>();

        try {
            Firestore firestore = FirestoreClient.getFirestore();
            CollectionReference devicesRef = firestore.collection("Devices");
            ApiFuture<QuerySnapshot> query = devicesRef.get();
            QuerySnapshot querySnapshot = query.get();
            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                DevicesApiResponse device = document.toObject(DevicesApiResponse.class);
                List<DevicesApiResponse.Item> itemsList = device.getItemsList();

                for (DevicesApiResponse.Item item : itemsList) {
                    if (item.getState().equals("in use")) {

                        Map<String, Integer> room;
                        if (devicesInRooms.containsKey(item.getLocated())) {
                            room = devicesInRooms.get(item.getLocated());
                            if (room.containsKey(device.getName())) {
                                room.put(device.getName(), room.get(device.getName()) + 1);
                            } else {
                                room.put(device.getName(), 1);
                            }
                        } else {
                            room = new HashMap<String, Integer>();
                            room.put(device.getName(), 1);
                        }
                        devicesInRooms.put(item.getLocated(), room);
                    }
                }
            }
            return devicesInRooms;
        } catch (FirestoreException e) {
            throw new RuntimeException(e);
        }
    }
}
