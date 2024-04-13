package com.rs.rmk.btl_ltnc.repository.devices;

import com.rs.rmk.btl_ltnc.model.devices.DevicesApiResponse;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Repository
public class GetListByID {
    public static List<DevicesApiResponse> getList(String rID, List<DevicesApiResponse> list) {
        List<DevicesApiResponse> result = new ArrayList<>();
        Iterator<DevicesApiResponse> iterator = list.iterator();

        while (iterator.hasNext()) {
            DevicesApiResponse T = iterator.next();
            List<DevicesApiResponse.Item> TL = T.getItemsList();
            boolean found = false;

            Iterator<DevicesApiResponse.Item> itemIterator = TL.iterator();
            while (itemIterator.hasNext()) {
                DevicesApiResponse.Item i = itemIterator.next();
                if (i.getLocated().contains(rID)) {
                    found = true;
                } else {
                    itemIterator.remove();
                }
            }

            if (found) {
                result.add(T);
            } else {
                iterator.remove();
            }
        }
        return result;
    }
}
