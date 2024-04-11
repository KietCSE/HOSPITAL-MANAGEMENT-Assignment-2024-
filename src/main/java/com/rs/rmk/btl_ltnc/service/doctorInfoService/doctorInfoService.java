package com.rs.rmk.btl_ltnc.service.doctorInfoService;

import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
import com.rs.rmk.btl_ltnc.repository.doctorInfoRepository.doctorInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.concurrent.ExecutionException;

@Service
public class doctorInfoService {
    @Autowired
    private doctorInfoRepository repository;

    public doctorInfoModel getDoctorInfo(String doctorName) throws ExecutionException, InterruptedException {
        return repository.getDoctorInfo(doctorName);
    }

    public doctorInfoModel addDoctorInfo(doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        LocalTime now = LocalTime.now();
        doctorInfoModel.setId(now.toString());
        return repository.addDoctorInfo(doctorInfoModel);
    }
}
