package com.rs.rmk.btl_ltnc.controller;

import com.rs.rmk.btl_ltnc.model.Item.Medicine;
import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;
import com.rs.rmk.btl_ltnc.service.GoogleAPI;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.ExecutionException;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class MedicineRestAPIController {
    @PostMapping("/medicine/add")
    public boolean postMedicine(@RequestBody Medicine medicine) throws ExecutionException, InterruptedException {
        System.out.println(medicine);
        return GoogleAPI.PostMedicine(medicine);
    }

    @GetMapping("/medicine/get/{MID}")
    public MedicineAPIRespone getMedicine(@PathVariable String MID) throws ExecutionException, InterruptedException {
        return GoogleAPI.GetMedicine(MID);
    }

    @PutMapping("/medicine/update/{MID}")
    public boolean putMedicine(@PathVariable String MID, @RequestBody Medicine medicine)
            throws ExecutionException, InterruptedException {
        return GoogleAPI.PutMedicine(MID, medicine);
    }

    @DeleteMapping("/medicine/delete/{MID}")
    public boolean deleteMedicine(@PathVariable String MID) throws ExecutionException, InterruptedException {
        return GoogleAPI.DeleteMedicine(MID);
    }
}
