package com.rs.rmk.btl_ltnc.repository.room;

import org.springframework.stereotype.Repository;

import com.rs.rmk.btl_ltnc.model.room.Room;

import java.util.ArrayList;
import java.util.List;

@Repository
public class roomRepo {
    public List<Room> get_All_Available_Room(List<Room> rooms) {
        // CHeck if room is available
        List<Room> result_List = new ArrayList<>();
        for (Room room : rooms) {
            if (!room.Is_Full()) {
                result_List.add(room);
            }
        }
        return result_List;
    }
}
