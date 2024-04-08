package com.rs.rmk.btl_ltnc.model.devices;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Builder
public class Items {
    String ID;
    String Located;
    String State;
    public Items(String id, String located, String state) {
        this.ID = id; this.Located = located; this.State = state;
    }
}
