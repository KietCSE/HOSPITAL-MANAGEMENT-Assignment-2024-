package com.rs.rmk.btl_ltnc.controller;

import com.rs.rmk.btl_ltnc.LocalSaved.LSMedicines;
import com.rs.rmk.btl_ltnc.model.Medicine;
import com.rs.rmk.btl_ltnc.service.GoogleAPI;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.ExecutionException;



@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {
    LSMedicines Medicine_Saved = new LSMedicines();
    @PostMapping("/medicine/add")
    public void postMedicine(@RequestBody Medicine medicine) throws ExecutionException, InterruptedException {
        System.out.println(medicine);
        Medicine_Saved.saveMedicine(medicine);
    }
    @GetMapping("/medicine/get/{MID}")
    public Medicine getMedicine(@PathVariable String MID) throws ExecutionException, InterruptedException {
        System.out.println(GoogleAPI.GetMedicine(MID));
        return GoogleAPI.GetMedicine(MID);
    }
}
