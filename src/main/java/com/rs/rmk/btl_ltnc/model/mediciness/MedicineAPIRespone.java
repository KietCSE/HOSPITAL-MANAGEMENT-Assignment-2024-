package com.rs.rmk.btl_ltnc.model.mediciness;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class MedicineAPIRespone {
    private String ID;
    private String Name;
    private String Amount;
    private String Validated;
    private String Img_Url;
    private String Type;
    private String Description;
    private String Uses;
    private String N_Uses;
    private String Classify;

    private History_Info History;

    @Data
    @Getter
    @Setter
    private static class History_Info {
        private String Day_Input;
        private List<String> Export_Date;

        History_Info() {
        }
    }

    MedicineAPIRespone() {
    }
}
