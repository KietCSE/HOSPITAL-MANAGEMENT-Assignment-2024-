package com.rs.rmk.btl_ltnc.model.Item;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MedicineAPIRespone {
    private String ID;
    private String Name;
    private String Amount;
    private String Date;
    private String Validated;
    private String Latest_Export;
    private String Img_Url;
    private String Type;
    private String Description;
    private String Uses;
    private String N_Uses;
    private String Classify;
    MedicineAPIRespone() {} // Default Constructor
}
