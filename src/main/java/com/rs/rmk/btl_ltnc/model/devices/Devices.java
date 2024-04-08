package com.rs.rmk.btl_ltnc.model.devices;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@Data
@Builder
public class Devices {
    String ID;
    String Name;
    String Type;
    String Supplier;
    int TotalAmount;
    int InUseAmount;
    int DamagedAmount;
    int StoredAmount;
    String Date;
    ArrayList<Items> ItemsList;
    ArrayList<Update> UpdateLog;

    @Setter
    @Getter
    @Data
    @Builder
    public static class Items {
        String ID;
        String Located;
        String State;
        public Items(String id, String located, String state) {
            this.ID = id; this.Located = located; this.State = state;
        }
    }

    @Setter
    @Getter
    @Data
    @Builder
    public static class Update {
        String Date;
        int TotalAmount;
        int InUseAmount;
        int DamagedAmount;
        int StoredAmount;
        public Update (String date, int totalAmount, int inUseAmount, int damagedAmount, int storedAmount) {
            this.Date = date; this.TotalAmount = totalAmount; this.InUseAmount = inUseAmount;
            this.DamagedAmount = damagedAmount; this.StoredAmount = storedAmount;
        }
    }
}
