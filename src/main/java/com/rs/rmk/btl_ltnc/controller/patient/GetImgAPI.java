package com.rs.rmk.btl_ltnc.controller.patient;
import com.rs.rmk.btl_ltnc.service.ImageAPI;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.ExecutionException;

@org.springframework.web.bind.annotation.RestController
public class GetImgAPI {
    @PostMapping("/patientinfo/upload")
    public String uploadPatientinfo(@RequestParam("file") MultipartFile file) {
        return new ImageAPI().upload(file);
    }

}
