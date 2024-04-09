package com.rs.rmk.btl_ltnc.controller.patient;

import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.patientinfo.info;
import com.rs.rmk.btl_ltnc.repository.patient.FirestorePatient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class patientController {
    @PostMapping("/postdatainfo")
    public ApiResponse<?> PostInfo(@RequestBody info patient) throws FirestoreException {
        FirestorePatient firestorePatient = new FirestorePatient();
        boolean check = firestorePatient.postPatient("Patient", patient);
        ApiResponse<?> apiResponse = new ApiResponse<>();
        apiResponse.setStatus(check);
        return apiResponse;
    }


}
