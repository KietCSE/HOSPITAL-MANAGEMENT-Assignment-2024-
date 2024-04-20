package com.rs.rmk.btl_ltnc.service.Medicine;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.exception.ErrorFirestore;
import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.mediciness.Medicine;
import com.rs.rmk.btl_ltnc.model.mediciness.MedicineAPIRespone;

import java.util.List;
import java.util.concurrent.ExecutionException;

public class GoogleMedicineAPI {

    public static boolean PostMedicine(Medicine medicine) throws FirestoreException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COLLECTION_NAME)
                    .document(medicine.getID())
                    .set(medicine);
            WriteResult writeResult = collectionsApiFuture.get();
            return writeResult != null;
        } catch ( ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_COLLECTION_DATA);
        }
    }

    public static MedicineAPIRespone GetMedicine(String documentId) throws FirestoreException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
        try {
            ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
            DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
            if (documentSnapshot.exists()) {
                return documentSnapshot.toObject(MedicineAPIRespone.class);
            } else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_COLLECTION_DATA);
        }
    }

    public static boolean PutMedicine(String documentId, Medicine medicine) throws FirestoreException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(documentId);
            ApiFuture<WriteResult> collectionsApiFuture = documentReference.set(medicine);
            WriteResult writeResult = collectionsApiFuture.get();
            return writeResult != null;
        }
        catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_CHANGE_DATA);
        }
    }

    public static boolean DeleteMedicine(String documentId) throws FirestoreException {
        String COLLECTION_NAME = "Medicines";
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(documentId).delete();
            return writeResult.get() != null;
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_DELETE_COLLECTION);
        }
    }

    public static MedicineAPIRespone GetMedicineByName(String medicineName)
            throws FirestoreException {
        String COLLECTION_NAME = "Medicines";

        Firestore dbFirestore = FirestoreClient.getFirestore();

        Query query = dbFirestore.collection(COLLECTION_NAME).whereEqualTo("name", medicineName).limit(1);
        try {
            ApiFuture<QuerySnapshot> querySnapshotApiFuture = query.get();
            QuerySnapshot querySnapshot = querySnapshotApiFuture.get();

            if (!querySnapshot.isEmpty()) {
                DocumentSnapshot documentSnapshot = querySnapshot.getDocuments().get(0);
                return documentSnapshot.toObject(MedicineAPIRespone.class);
            } else {
                return null;
            }
        } catch ( ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_COLLECTION_DATA);
        }
    }

    public static List<MedicineAPIRespone> GetAllMedicines() throws FirestoreException {
        String COLLECTION_NAME = "Medicines";
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            CollectionReference collectionReference = dbFirestore.collection(COLLECTION_NAME);
            ApiFuture<QuerySnapshot> querySnapshotApiFuture = collectionReference.get();
            QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
            return querySnapshot.toObjects(MedicineAPIRespone.class);
        } catch (ExecutionException | InterruptedException e) {
            throw new FirestoreException(ErrorFirestore.NOT_GET_DOCUMENT);
        }
    }
}
