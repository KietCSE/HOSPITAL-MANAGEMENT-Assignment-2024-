package com.rs.rmk.btl_ltnc.service.doctorInfoService;

import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
import com.rs.rmk.btl_ltnc.repository.doctorInfoRepository.doctorInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class doctorInfoService {
    @Autowired
    private doctorInfoRepository repository;

    public List<doctorInfoModel> getDoctorList() throws ExecutionException, InterruptedException {
        return repository.getDoctorList();
    }

    public doctorInfoModel getDoctorInfo(String doctorID) throws ExecutionException, InterruptedException {
        return repository.getDoctorInfo(doctorID);
    }

    public doctorInfoModel addDoctorInfo(doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        LocalTime now = LocalTime.now();
        doctorInfoModel.setId(now.toString());
        return repository.addDoctorInfo(doctorInfoModel);
    }


    private Map<String, Object> convertToMap(doctorInfoModel doctorInfoModel) {
        Map<String, Object> map = new HashMap<>();
        map.put("phoneNumber", doctorInfoModel.getPhoneNumber());
        map.put("address", doctorInfoModel.getAddress());
        map.put("university", doctorInfoModel.getUniversity());
        map.put("departmentName", doctorInfoModel.getDepartmentName());
        map.put("major", doctorInfoModel.getMajor());
        return map;
    }
    public doctorInfoModel updateDoctorInfo(doctorInfoModel doctorInfoModel) throws ExecutionException, InterruptedException {
        Map<String, Object> update = convertToMap(doctorInfoModel);
        return repository.updateDoctorInfo(doctorInfoModel.getId(), update);
    }

    public boolean deleteDoctorInfo(String doctorID) throws ExecutionException, InterruptedException {
        return repository.deleteDoctorInfo(doctorID);
    }
}