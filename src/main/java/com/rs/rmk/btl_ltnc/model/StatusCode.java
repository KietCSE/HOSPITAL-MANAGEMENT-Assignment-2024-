package com.rs.rmk.btl_ltnc.model;

// CLASS LIỆT KÊ CÁC STATUS CODE DÙNG TRONG API_RESPONSE

public enum StatusCode {
    // GENERAL ERROR
    SUCCESS(400),
    ERROR(500),

    //ERROR WITH FIREBASE
    DOCUMENT_NOT_FOUND(505),
    NOT_STORE_DATA(506),
    NOT_DELETE_DATA(507),
    NOT_GET_COLLECTION_DATA(508),
    NOT_CHANGE_DATA(509),
    NOT_GET_DOCUMENT(510),
    NOT_DELETE_COLLECTION(511),
    COLLECTION_NOT_FOUND(512),

    // ERROR VALIDATION
    VALIDATION_ERROR(700);
    int code;

    StatusCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
