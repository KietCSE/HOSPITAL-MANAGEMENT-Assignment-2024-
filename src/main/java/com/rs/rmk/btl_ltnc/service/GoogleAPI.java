package com.rs.rmk.btl_ltnc.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.Medicine;

import java.util.concurrent.ExecutionException;

public class GoogleAPI {

    public static String PostMedicine(Medicine medicine) throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> documentReferenceApiFuture = dbFirestore.collection(COLLECTION_NAME).add(medicine);
        DocumentReference documentReference = documentReferenceApiFuture.get();

        return documentReference.getPath();
    }

    public static Medicine GetMedicine(String documentId) throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        if (documentSnapshot.exists()) {
            return documentSnapshot.toObject(Medicine.class);
        } else {
            return null;
        }
    }

    public static Medicine UpdateMedicine(String documentId, Medicine medicine)
            throws ExecutionException, InterruptedException {
        String COLLECTION_NAME = "Medicines";
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        if (documentSnapshot.exists()) {
            dbFirestore.collection(COLLECTION_NAME).document(documentId).set(medicine);
            return documentSnapshot.toObject(Medicine.class);
        } else {
            return null;
        }
    }
}
