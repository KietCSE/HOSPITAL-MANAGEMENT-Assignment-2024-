package com.rs.rmk.btl_ltnc.service.room;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.room.Room;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class roomService {
    private static final String COLLECTION_NAME = "Rooms";

    // Get list of available rooms
    public static List<Room> get_All_Room() throws FirestoreException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            CollectionReference collectionReference = dbFirestore.collection(COLLECTION_NAME);
            ApiFuture<QuerySnapshot> querySnapshotApiFuture = collectionReference.get();
            QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
            return querySnapshot.toObjects(Room.class);
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_DOCUMENT);
        }
    }

    // Post all list room information to the system
    public static void post_Info(List<Room> roomList) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        for (Room room : roomList) {
            dbFirestore.collection(COLLECTION_NAME)
                    .document(room.getRId())
                    .set(room);
        }
    }

    public static boolean Check_Full(String rID) throws FirestoreException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            Room room = dbFirestore.collection(COLLECTION_NAME).document(rID).get().get().toObject(Room.class);
            return room == null || room.Is_Full();
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_DOCUMENT);
        }
    }
}
