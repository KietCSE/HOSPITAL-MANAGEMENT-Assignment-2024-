package com.rs.rmk.btl_ltnc.controller.devicesAPI;

import com.rs.rmk.btl_ltnc.model.devices.Devices;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
public class DevicesAPI {
    @PostMapping("/add")
    public boolean addDevices (@RequestBody Devices devices) {
        System.out.println(devices);
        return true;
    }
}
