package com.rs.rmk.btl_ltnc.controller;

import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.Item.Medicine;
import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;
import com.rs.rmk.btl_ltnc.service.ImageAPI;
import com.rs.rmk.btl_ltnc.service.Medicine.GoogleMedicineAPI;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.rs.rmk.btl_ltnc.model.StatusCode.NOT_GET_DOCUMENT;
import static com.rs.rmk.btl_ltnc.model.StatusCode.SUCCESS;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class MedicineRestAPIController {
    @PostMapping("/medicine/add")
    public boolean postMedicine(@RequestBody Medicine medicine) throws ExecutionException, InterruptedException {
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
    public ApiResponse GetMedicineByName(@PathVariable String Name) throws ExecutionException, InterruptedException {
        ApiResponse result;
        MedicineAPIRespone medicine = GoogleMedicineAPI.GetMedicineByName(Name);
        if (medicine == null)
            result = new ApiResponse<>(NOT_GET_DOCUMENT, "Không thể lấy dữ liệu", null, false);
        else {
            result = new ApiResponse<>(SUCCESS, "Lấy dữ liệu thành công", medicine, true);
        }
        return result;
    }

    @PostMapping("/medicine/upload")
    public String uploadMedicine(@RequestParam("file") MultipartFile file) {
        return new ImageAPI().upload(file);
    }

    @GetMapping("/medicine/getAllMedicine")
    public List<MedicineAPIRespone> getAllMedicine() throws ExecutionException, InterruptedException {
        return GoogleMedicineAPI.GetAllMedicines();
    }
}
