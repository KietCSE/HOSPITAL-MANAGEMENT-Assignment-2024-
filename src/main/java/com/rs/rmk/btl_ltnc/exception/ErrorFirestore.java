package com.rs.rmk.btl_ltnc.exception;

import com.rs.rmk.btl_ltnc.model.StatusCode;
import org.springframework.http.HttpStatus;

// CLASS LIỆT KÊ CÁC KIỂU LỖI CÓ THỂ NÉM RA TỪ FIREBASE

public enum ErrorFirestore {
    NOT_GET_IMAGE(StatusCode.NOT_GET_IMAGE, "Cant find the image", HttpStatus.BAD_REQUEST),
    DOCUMENT_NOT_FOUND(StatusCode.DOCUMENT_NOT_FOUND, "Cant find the document",HttpStatus.NOT_FOUND),
    NOT_STORE_DATA(StatusCode.NOT_STORE_DATA, "Cant store data into firestore", HttpStatus.NOT_FOUND),
    NOT_DELETE_DATA(StatusCode.NOT_DELETE_DATA, "Cant delete data in firestore", HttpStatus.BAD_REQUEST),
    NOT_GET_COLLECTION_DATA(StatusCode.NOT_GET_COLLECTION_DATA, "Cant get collection in firestore", HttpStatus.NOT_FOUND),
    NOT_CHANGE_DATA(StatusCode.NOT_CHANGE_DATA, "Cant update data in firestore", HttpStatus.BAD_REQUEST),
    NOT_GET_DOCUMENT(StatusCode.NOT_GET_DOCUMENT, "Cant load document in firestore", HttpStatus.NOT_FOUND),
    NOT_DELETE_COLLECTION(StatusCode.NOT_DELETE_COLLECTION, "Cant delete collection successfully", HttpStatus.BAD_REQUEST),
    COLLECTION_NOT_FOUND(StatusCode.COLLECTION_NOT_FOUND, "Cant find collection", HttpStatus.NOT_FOUND),
    ;
    private final StatusCode code;
    private final String message;
    private final HttpStatus status;

    ErrorFirestore(StatusCode code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public StatusCode getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
