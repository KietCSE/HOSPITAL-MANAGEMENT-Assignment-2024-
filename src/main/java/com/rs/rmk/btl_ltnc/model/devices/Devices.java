package com.rs.rmk.btl_ltnc.model.devices;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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
}
