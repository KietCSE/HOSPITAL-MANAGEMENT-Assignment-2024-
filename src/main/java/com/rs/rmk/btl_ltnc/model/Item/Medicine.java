package com.rs.rmk.btl_ltnc.model.Item;

import com.rs.rmk.btl_ltnc.model.Item.Item;
import lombok.*;




@Data
@Builder
@Getter
@Setter
public class Medicine implements Item {
    private String ID;
    private String Name;
    private String Amount;
    private String Date;
    private String Validated;
    private String Latest_Export;
    private String Img;
    private String Type;
    private String Description;
    private String Uses;
    private String N_Uses;
    private String Classify;

    @Override
    public String ItemStatus() {
        return null;
    }

    @Override
    public String HistoryLog() {
        return null;
    }

    @Override
    public void Maintenance() {}

    @Override
    public boolean IsValid() {
        return false;
    }

//    public Medicine() {} // default constructor.
}
