package com.rs.rmk.btl_ltnc.controller.patient;

import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.repository.patient.FirestorePatient;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class patientController {
    @Autowired
    FirestorePatient service;

    @GetMapping("/patient/getData")
    public ApiResponse<List<Map<String,Object>>> getPatientData() throws FirestoreException {
        List<Map<String,Object>> list = service.getPateintList("Patient");
        log.info(list.toString());
        ApiResponse<List<Map<String,Object>>> response = new ApiResponse<>();
        if (!list.isEmpty()) {
            response.setMessage("Load successfully");
            response.setData(list);
            response.setStatus(true);
            return response;
        }
        else {
            response.setMessage("Incorrect collection name or have no data");
            response.setStatus(false);
            return response;
        }
    }
}
