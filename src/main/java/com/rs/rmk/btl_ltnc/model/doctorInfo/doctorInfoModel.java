package com.rs.rmk.btl_ltnc.model.doctorInfo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class doctorInfoModel {
    private String fullName;
    private String yearOfBirth;
    private String phoneNumber;
    private String address;
    private String university;
    private String departmentName;
    private String major;
    private String id;

    doctorInfoModel() {}
}
