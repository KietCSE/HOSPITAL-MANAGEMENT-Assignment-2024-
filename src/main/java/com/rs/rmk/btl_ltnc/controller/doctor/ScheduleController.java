package com.rs.rmk.btl_ltnc.controller.doctor;

import com.rs.rmk.btl_ltnc.model.task.taskModel;
import com.rs.rmk.btl_ltnc.service.scheduleService.scheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class ScheduleController {
    @Autowired
    private scheduleService scheduleService;

    @GetMapping("/schedule/list")
    public List<List<taskModel>> getSchedule(@RequestParam String nameDoctor) throws ExecutionException, InterruptedException {
        return scheduleService.getSchedule(nameDoctor);
    }
}
