package com.rs.rmk.btl_ltnc.controller.doctor;

import com.rs.rmk.btl_ltnc.model.task.taskModel;
import com.rs.rmk.btl_ltnc.service.scheduleService.scheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class ScheduleController {
    @Autowired
    private scheduleService scheduleService;

    @GetMapping("/schedule/list")
    public List<List<taskModel>> getSchedule(@RequestParam String doctorName) throws ExecutionException, InterruptedException {
        return scheduleService.getSchedule(doctorName);
    }

    @PostMapping("schedule/add")
    public boolean addTask(@RequestParam String doctorName, @RequestBody taskModel task) throws ExecutionException, InterruptedException, ParseException {
        return scheduleService.addTask(doctorName, task);
    }
}
