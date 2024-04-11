package com.rs.rmk.btl_ltnc.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private StatusCode code;
    private String message;
    private Boolean status;
    private T data;

    public ApiResponse(StatusCode code, String message, T result, Boolean status) {
        this.code = code;
        this.message = message;
        this.data = result;
        this.status = status;
    }

    public ApiResponse() {}
}
