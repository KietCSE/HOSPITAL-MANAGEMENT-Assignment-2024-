package com.rs.rmk.btl_ltnc.controller.room;

import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.room.Room;
import com.rs.rmk.btl_ltnc.repository.room.roomRepo;
import com.rs.rmk.btl_ltnc.service.room.roomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import static com.rs.rmk.btl_ltnc.model.StatusCode.*;

@RestController
@RequestMapping("/api")
public class roomAPI {
    @Autowired
    public roomRepo repository = new roomRepo();

    // Phương thức này dùng để trả về các phòng trống trong room
    @GetMapping("/get/list/room")
    public ApiResponse<?> get_Available_Room() throws FirestoreException {
        List<Room> roomList = roomService.get_All_Room();
        List<Room> result = repository.get_All_Available_Room(roomList);
        // Ko có phòng trống
        if (result.isEmpty())
            return new ApiResponse<>(ERROR, "Không có phòng trống", null, false);
        // Trả về true nếu còn phòng.
        return new ApiResponse<>(SUCCESS, "OK", result, true);
    }

    @GetMapping("/get/All/list/room")
    public ApiResponse<?> get_All_Room() throws FirestoreException {
        List<Room> roomList = roomService.get_All_Room();
        if (roomList.isEmpty())
            return new ApiResponse<>(ERROR, "DS Rỗng", null, false);
        return new ApiResponse<>(SUCCESS, "OK", roomList, true);
    }

    @PutMapping("/room/update")
    public ApiResponse<?> update(@RequestParam Room room) throws FirestoreException{
        roomService.post_Info_2(room);
        return new ApiResponse<>(SUCCESS,"MSG", room, true);
    }


    // Phuong thuc nay de tao 1 luong phong truoc
    @PostMapping("/create")
    private void Create() {
        List<Room> RT = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Room room_T = new Room();
            room_T.setRId("H1" + "-" + "10" + (i + 1));
            room_T.setList_Devices(new ArrayList<>());
            room_T.setNumber_Patient(0);
            RT.add(room_T);
        }
        for (int i = 0; i < 5; i++) {
            Room room_T = new Room();
            room_T.setRId("H2" + "-" + "20" + (i + 1));
            room_T.setList_Devices(new ArrayList<>());
            room_T.setNumber_Patient(0);
            RT.add(room_T);
        }
        roomService.post_Info(RT);
    }

    // Kiem tra phong day
    @PostMapping("/checking/full/{rID}")
    public ApiResponse<?> Check_Full(@PathVariable String rID) throws FirestoreException {
        return new ApiResponse<>(SUCCESS, "OK", roomService.Check_Full(rID), true);
    }

}
