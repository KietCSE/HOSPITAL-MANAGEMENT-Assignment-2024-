package com.rs.rmk.btl_ltnc.LocalSaved;

import com.rs.rmk.btl_ltnc.model.Medicine;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import static com.rs.rmk.btl_ltnc.service.GoogleAPI.PostMedicine;

public class LSMedicines {
    private ArrayList<Medicine> Med_List = new ArrayList<>();
    public LSMedicines() {} // Default constructor
    private ArrayList<String> documentPath = new ArrayList<>();
    public void saveMedicine(Medicine medicine) throws ExecutionException, InterruptedException {
        // Post API
        documentPath.add(PostMedicine(medicine));
        // Saving local
        Med_List.add(medicine);
    }
}
