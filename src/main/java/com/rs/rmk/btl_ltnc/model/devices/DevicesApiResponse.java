package com.rs.rmk.btl_ltnc.model.devices;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Data
public class DevicesApiResponse {
    private String id;
    private String name;
    private String type;
    private String supplier;
    private String img_url;
    private int totalAmount;
    private int inUseAmount;
    private int damagedAmount;
    private int storedAmount;
    private String date;
    private List<Item> itemsList;
    private List<Update> updateLog;

    @Setter
    @Getter
    @Data
    public static class Item {
        private String id;
        private String located;
        private String state;
    }

    @Setter
    @Getter
    @Data
    public static class Update {
        private int damagedAmount;
        private String date;
        private int inUseAmount;
        private int storedAmount;
        private int totalAmount;
    }
}