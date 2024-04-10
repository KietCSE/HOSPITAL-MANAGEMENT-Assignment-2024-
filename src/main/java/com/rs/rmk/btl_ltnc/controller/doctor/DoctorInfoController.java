package com.rs.rmk.btl_ltnc.controller.doctor;

import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
import com.rs.rmk.btl_ltnc.service.doctorInfoService.doctorInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class DoctorInfoController {
    @Autowired
    private doctorInfoService service;

    @GetMapping("/api/doctor/list")
    public List<doctorInfoModel> getDoctorList() throws ExecutionException, InterruptedException {
        return service.getDoctorList();
    }

    @GetMapping("/api/doctor/info")
    public doctorInfoModel getDoctorInfo(@RequestParam String doctorName) throws ExecutionException, InterruptedException {
        return service.getDoctorInfo(doctorName);
    }

    @PostMapping("/api/doctor/add")
    public doctorInfoModel addDoctorInfo(@RequestBody doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        return service.addDoctorInfo(doctorInfoModel);
    }

    @PutMapping("/api/doctor/update")
    public doctorInfoModel updateDoctorInfo(@RequestBody doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        return service.updateDoctorInfo(doctorInfoModel);
    }
}
