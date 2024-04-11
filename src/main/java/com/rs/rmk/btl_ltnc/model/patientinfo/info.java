package com.rs.rmk.btl_ltnc.model.patientinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class info {
    private String id;
    private String imgurl;
    private String name;
    private String room;
    private String phone_number;
    private String address;
    private String b_day;
    private String status;
    private String treatment_schedule;
    private String medical_history;
    private String dr;
}
