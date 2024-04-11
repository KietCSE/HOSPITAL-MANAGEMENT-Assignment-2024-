package com.rs.rmk.btl_ltnc.controller.medicine;

import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.model.ApiResponse;
import com.rs.rmk.btl_ltnc.model.Item.Medicine;
import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;
import com.rs.rmk.btl_ltnc.service.Medicine.GoogleMedicineAPI;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static com.rs.rmk.btl_ltnc.model.StatusCode.*;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class MedicineRestAPIController {
    @PostMapping("/medicine/add")
    public ApiResponse<?> postMedicine(@RequestBody Medicine medicine) throws FirestoreException {
        return GoogleMedicineAPI.PostMedicine(medicine) ? new ApiResponse<>(SUCCESS, "Post dữ liệu thành công", medicine, true)
                : new ApiResponse<>(ERROR, "Không thể post data", null, false);
    }
    @GetMapping("/medicine/get/{MID}")
    public ApiResponse<?> getMedicine(@PathVariable String MID) throws FirestoreException {
        MedicineAPIRespone medicineAPIRespone = GoogleMedicineAPI.GetMedicine(MID);
        return (medicineAPIRespone != null) ?
                new ApiResponse<>(SUCCESS, "Lấy dữ liệu thành công", medicineAPIRespone, true)
                : new ApiResponse<>(ERROR, "Không thể lấy dữ liệu", null, false);
    }

    @PutMapping("/medicine/update/{MID}")
    public ApiResponse<?> putMedicine(@PathVariable String MID, @RequestBody Medicine medicine)
            throws FirestoreException {
        return (GoogleMedicineAPI.PutMedicine(MID, medicine)) ?
                new ApiResponse<>(SUCCESS, "Lấy dữ liệu thành công", medicine, true)
                : new ApiResponse<>(ERROR, "Không thể lấy dữ liệu", null, false);
    }

    @DeleteMapping("/medicine/delete/{MID}")
    public ApiResponse<?> deleteMedicine(@PathVariable String MID) throws FirestoreException {
        return GoogleMedicineAPI.DeleteMedicine(MID) ? new ApiResponse<>(SUCCESS, "Xóa dữ liệu thành công", MID, true)
                : new ApiResponse<>(ERROR, "Xóa thất bại", MID, false);
    }

    @GetMapping("/medicine/getElement/{Name}")
    public ApiResponse<?> GetMedicineByName(@PathVariable String Name) throws FirestoreException {
        ApiResponse<?> result;
        MedicineAPIRespone medicine = GoogleMedicineAPI.GetMedicineByName(Name);
        if (medicine == null)
            result = new ApiResponse<>(NOT_GET_DOCUMENT, "Không thể lấy dữ liệu", null, false);
        else {
            result = new ApiResponse<>(SUCCESS, "Lấy dữ liệu thành công", medicine, true);
        }
        return result;
    }

    @GetMapping("/medicine/getAllMedicine")
    public List<MedicineAPIRespone> getAllMedicine() throws FirestoreException {
        return GoogleMedicineAPI.GetAllMedicines();
    }
}
