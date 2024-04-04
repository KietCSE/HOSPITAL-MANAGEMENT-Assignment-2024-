package com.rs.rmk.btl_ltnc.exception;

import lombok.Getter;

// CLASS ĐẠI DIỆN CHO LỖI NÉM RA TỪ FIREBASE

@Getter
public class FirestoreException extends Exception {
    private final ErrorFirestore errorFirestore;

    public FirestoreException(ErrorFirestore errorFirestore) {
        super(errorFirestore.getMessage());
        this.errorFirestore = errorFirestore;
    }
}
