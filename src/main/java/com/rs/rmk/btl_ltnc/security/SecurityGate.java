package com.rs.rmk.btl_ltnc.security;

import com.rs.rmk.btl_ltnc.model.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityGate {
    @PostMapping("/navigatePatient")
    public ApiResponse<?> NagivatePatient() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateDoctor")
    public ApiResponse<?> NagivateDoctor() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateTool")
    public ApiResponse<?> NagivateTool() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateMedicine")
    public ApiResponse<?> NagivateMedicine() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateSchedule")
    public ApiResponse<?> NavigateSchedule() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateDoctorSchedule")
    public ApiResponse<?> NavigateDoctorSchedule() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }

    @PostMapping("/navigateRoom")
    public ApiResponse<?> NavigateRoom() {
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(true);
        return apiResponse;
    }
}

