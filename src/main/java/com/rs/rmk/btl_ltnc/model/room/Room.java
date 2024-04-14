package com.rs.rmk.btl_ltnc.model.room;

import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.model.patientinfo.info;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Room {
    private String rId;
    private int number_Patient;
    private int max_Size = 5;

    private List<Devices> list_Devices;

    public boolean Is_Full() {
        return (number_Patient >= 5);
    }
}
