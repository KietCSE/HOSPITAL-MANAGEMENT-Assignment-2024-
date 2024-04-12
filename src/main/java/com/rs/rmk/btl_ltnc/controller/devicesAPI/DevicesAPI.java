package com.rs.rmk.btl_ltnc.controller.devicesAPI;

import com.rs.rmk.btl_ltnc.model.devices.Devices;
import com.rs.rmk.btl_ltnc.service.devices.DevicesGoogleApi;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.Location;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/devices")
public class DevicesAPI {
    @PostMapping("/add")
    public boolean addDevices (@RequestBody Devices devices) throws ExecutionException, InterruptedException {
        System.out.println(devices);
        return DevicesGoogleApi.addDevices(devices);
    }

    @PostMapping("/searchDevices")
    public ArrayList<Map<String, ?>> searchDevices (@RequestBody String searchContent) throws ExecutionException, InterruptedException {

        return DevicesGoogleApi.searchDevices(searchContent);
    }

    @PostMapping("/getInfoByID")
    public ArrayList<Map<String, ?>> getInfoByID (@RequestBody String idToSearch) throws ExecutionException, InterruptedException {

        return DevicesGoogleApi.getInfoByID(idToSearch);
    }

    @PostMapping("/updateItem")
    public boolean updateItem (@RequestBody Map<String, String> req) throws ExecutionException, InterruptedException {

        String ID = req.get("ID");
        String Act = req.get("Act");
        String Location = req.get("Location");
        return DevicesGoogleApi.updateItem(ID, Act, Location);
    }

    @PostMapping("/save")
    public boolean save (@RequestBody String id) throws ExecutionException, InterruptedException {

        return DevicesGoogleApi.saveUpdateLog(id);
    }

    @DeleteMapping("/delete")
    public boolean delete (@RequestBody String id) throws ExecutionException, InterruptedException {

        return DevicesGoogleApi.deleteDevice(id);
    }
}
