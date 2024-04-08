package com.rs.rmk.btl_ltnc.controller;

import com.rs.rmk.btl_ltnc.model.Item.Medicine;
import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;
import com.rs.rmk.btl_ltnc.service.ImageAPI;
import com.rs.rmk.btl_ltnc.service.Medicine.GoogleMedicineAPI;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.concurrent.ExecutionException;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class MedicineRestAPIController {
    @PostMapping("/medicine/add")
    public boolean postMedicine(@RequestBody Medicine medicine) throws ExecutionException, InterruptedException {
        System.out.println(medicine);
        return GoogleMedicineAPI.PostMedicine(medicine);
    }

    @GetMapping("/medicine/get/{MID}")
    public MedicineAPIRespone getMedicine(@PathVariable String MID) throws ExecutionException, InterruptedException {
        return GoogleMedicineAPI.GetMedicine(MID);
    }

    @PutMapping("/medicine/update/{MID}")
    public boolean putMedicine(@PathVariable String MID, @RequestBody Medicine medicine)
            throws ExecutionException, InterruptedException {
        return GoogleMedicineAPI.PutMedicine(MID, medicine);
    }

    @DeleteMapping("/medicine/delete/{MID}")
    public boolean deleteMedicine(@PathVariable String MID) throws ExecutionException, InterruptedException {
        return GoogleMedicineAPI.DeleteMedicine(MID);
    }

    @GetMapping("/medicine/getElement/{Name}")
    public MedicineAPIRespone GetMedicineByName(@PathVariable String Name)
            throws ExecutionException, InterruptedException {
        return GoogleMedicineAPI.GetMedicineByName(Name);
    }

    @PostMapping("/medicine/upload")
    public String uploadMedicine(@RequestParam("file") MultipartFile file) {
        return new ImageAPI().upload(file);
    }
}
