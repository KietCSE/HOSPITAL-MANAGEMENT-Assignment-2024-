package com.rs.rmk.btl_ltnc.repository.devices;

import com.rs.rmk.btl_ltnc.model.devices.DevicesApiResponse;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class GetListByID {
    public static List<DevicesApiResponse.Item> getListItembyId(String rID, List<DevicesApiResponse> List) {

        List<DevicesApiResponse.Item> result = new ArrayList<>();

        for(DevicesApiResponse T : List) {
            List<DevicesApiResponse.Item> items = T.getItemsList();
            for(DevicesApiResponse.Item i : items) {
                if(i.getLocated().equals(rID)) {
                    result.add(i);
                }
            }
        }
        return result;
    }
}
