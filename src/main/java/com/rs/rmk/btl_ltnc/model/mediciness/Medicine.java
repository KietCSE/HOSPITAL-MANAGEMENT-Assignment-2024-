package com.rs.rmk.btl_ltnc.model.mediciness;

import java.util.List;

import lombok.*;

@Data
@Builder
@Getter
@Setter
public class Medicine {
    private String ID;
    private String Name;
    private String Amount;
    // private String Date;
    private String Validated;
    // private String Latest_Export;

    private String Img_Url;
    private String Type;
    private String Description;
    private String Uses;
    private String N_Uses;
    private String Classify;

    // Make inside collection name History
    private History_Info History;

    @Data
    @Builder
    @Getter
    @Setter
    public static class History_Info {
        private String Day_Input;
        private List<String> Export_Date;
    }
}
