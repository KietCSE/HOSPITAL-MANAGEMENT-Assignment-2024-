package com.rs.rmk.btl_ltnc.service.scheduleService;

import com.rs.rmk.btl_ltnc.model.task.taskModel;
import com.rs.rmk.btl_ltnc.repository.scheduleRepository.scheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class scheduleService  {
    @Autowired
    private scheduleRepository scheduleRepository;

    public List<List<taskModel>> getSchedule(String nameDoctor) throws ExecutionException, InterruptedException {
        return scheduleRepository.getSchedule(nameDoctor);
    }
}
