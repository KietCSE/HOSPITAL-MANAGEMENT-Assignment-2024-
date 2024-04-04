package com.rs.rmk.btl_ltnc.exception;

import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.StatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Objects;

// CLASS XỬ LÝ CHUNG CHO CÁC LỖI TỪ CÁC CLASS KHÁC

@ControllerAdvice
public class GlobalExceptionHandler {
    // xử lý chung cho các exception
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<?>> handlerException(Exception exception) {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setCode(StatusCode.ERROR);
        apiResponse.setMessage(exception.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // xử lý exception truy cập giá trị null
    @ExceptionHandler(value = NullPointerException.class)
    ResponseEntity<ApiResponse<?>> handlerNullPointer(NullPointerException exception) {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setMessage("Null pointer happen");
        apiResponse.setCode(StatusCode.ERROR);
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // xử lý exception liên quan đến validation
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<?>> ValidationHandler(MethodArgumentNotValidException exception) {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setCode(StatusCode.VALIDATION_ERROR);
        apiResponse.setStatus(false);
        String msg = Objects.requireNonNull(exception.getFieldError()).getDefaultMessage();
        apiResponse.setMessage(msg);
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // xử lý exceoption từ firebase
    // tiếp nhận exception sau đó trả về http với status = status exception và body = message + code
    @ExceptionHandler(value = FirestoreException.class)
    ResponseEntity<ApiResponse<?>> handlerFirestore(FirestoreException exception) {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setCode(exception.getErrorFirestore().getCode());
        apiResponse.setMessage(exception.getMessage());
        return ResponseEntity.status(exception.getErrorFirestore().getStatus()).body(apiResponse);
    }
}
