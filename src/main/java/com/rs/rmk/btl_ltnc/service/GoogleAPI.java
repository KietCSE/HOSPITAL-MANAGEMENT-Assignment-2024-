package com.rs.rmk.btl_ltnc.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.Item.Medicine;
import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;

import java.util.concurrent.ExecutionException;

public class GoogleAPI {

    public static boolean PostMedicine(Medicine medicine) throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COLLECTION_NAME)
                .document(medicine.getID())
                .set(medicine);
        WriteResult writeResult = collectionsApiFuture.get();
        return writeResult != null;
    }

    public static MedicineAPIRespone GetMedicine(String documentId) throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        if (documentSnapshot.exists()) {
            return documentSnapshot.toObject(MedicineAPIRespone.class);
        } else {
            return null;
        }
    }

    public static boolean PutMedicine(String documentId, Medicine medicine)
            throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
        ApiFuture<WriteResult> collectionsApiFuture = documentReference.set(medicine);
        WriteResult writeResult = collectionsApiFuture.get();
        return writeResult != null;
    }

    public static boolean DeleteMedicine(String documentId) throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(documentId).delete();
        return writeResult.get() != null;
    }
}
