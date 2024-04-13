package com.rs.rmk.btl_ltnc.controller.doctor;

import com.rs.rmk.btl_ltnc.model.doctorInfo.doctorInfoModel;
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
    public List<List<taskModel>> getSchedule(@RequestParam String doctorID) throws ExecutionException, InterruptedException {
        return scheduleService.getSchedule(doctorID);
    }

    @PostMapping("/schedule/admin/add")
    public taskModel addTask(@RequestParam String doctorID, @RequestBody taskModel task) throws ExecutionException, InterruptedException, ParseException {
        return scheduleService.addTask(doctorID, task);
    }

    @DeleteMapping("/schedule/admin/delete")
    public boolean deleteTask(@RequestParam String doctorID, @RequestBody taskModel task) throws ExecutionException, InterruptedException, ParseException {
        return scheduleService.deleteTask(doctorID, task);
    }

    @GetMapping("/schedule/test")
    public List<String> getListDoctorID(@RequestBody taskModel task) throws ExecutionException, InterruptedException, ParseException {
        return scheduleService.changeSchedule(task.getDay(), task.getFrom(), task.getTo(), task.getDepartmentName());
    }
}
