package com.rs.rmk.btl_ltnc.repository.devices;

import com.rs.rmk.btl_ltnc.model.devices.Devices;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class Prepare {
    public static void prepareDevices(Devices devices) {
        LocalDateTime now = LocalDateTime.now();
        // Định dạng thời gian
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        // Chuyển đổi thời gian thành chuỗi với định dạng mong muốn
        String id = now.format(formatter);
        devices.setID(id);
        int totalAmount = devices.getTotalAmount();
        ArrayList<Devices.Items> items = new ArrayList<Devices.Items>();
        for (int i = 0; i < totalAmount; i++) {
            String newId = id + "_" + (i);
            Devices.Items item = new Devices.Items(newId, "kho", "stored");
            items.add(item);
        }
        devices.setItemsList(items);
        Devices.Update update = new Devices.Update(devices.getDate(),
                totalAmount, 0, 0, totalAmount);
        ArrayList<Devices.Update> updateLog = new ArrayList<Devices.Update>();
        updateLog.add(update);
        devices.setUpdateLog(updateLog);
    }
}
