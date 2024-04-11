package com.rs.rmk.btl_ltnc.controller.ImageAPI;


import com.rs.rmk.btl_ltnc.exception.FirestoreException;
import com.rs.rmk.btl_ltnc.service.ImageAPI;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class Image {
    @PostMapping("/Image")
    public String GetImage(@RequestParam("file")MultipartFile file) throws FirestoreException {
        return new ImageAPI().upload(file);
    }
}
