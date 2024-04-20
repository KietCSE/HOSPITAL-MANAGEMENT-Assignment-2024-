package com.rs.rmk.btl_ltnc.repository.scheduleRepository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.rs.rmk.btl_ltnc.model.task.taskModel;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class scheduleRepository  {
    public List<taskModel> getTaskListAtDay(String doctorID, String day, String date) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = database.collection("Doctor").document(doctorID)
                .collection("schedule").document(date)
                .collection("tasks").whereEqualTo("day", day).get();
        QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
        List<taskModel> scheduleAtDay = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot) {
            scheduleAtDay.add(document.toObject(taskModel.class));
        }
        return scheduleAtDay;
    }
    //Get shedule
    private List<taskModel> getScheduleAtDate(String doctorID, String date) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> querySnapshotApiFuture = database.collection("Doctor").document(doctorID)
                .collection("schedule").document(date)
                .collection("tasks").get();
        //List task trong thu 2
        QuerySnapshot querySnapshot = querySnapshotApiFuture.get();
        List<taskModel> scheduleAtDate = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot) {
            scheduleAtDate.add(document.toObject(taskModel.class));
        }
        return scheduleAtDate;
    }

    public List<List<taskModel>> getSchedule(String doctorID) throws ExecutionException, InterruptedException {
        List<List<taskModel>> schedule = new ArrayList<>();
        for (int index = 2; index <= 7; index++) {
            String date = "Thu" + Integer.toString(index);
            schedule.add(getScheduleAtDate(doctorID, date));
        }
        schedule.add(getScheduleAtDate(doctorID, "CN"));
        return schedule;
    }

    //Add task
    public taskModel addTask(String doctorID, taskModel task, String date) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = database.collection("Doctor").document(doctorID)
                .collection("schedule").document(date)
                .collection("tasks").document(task.getId()).set(task);
        return task;
    }

    //Delete task
    public boolean deleteTask(String doctorID, taskModel task, String date) throws ExecutionException, InterruptedException {
        Firestore database = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = database.collection("Doctor").document(doctorID)
                .collection("schedule").document(date)
                .collection("tasks").document(task.getId()).delete();
        WriteResult writeResult = future.get();
        return true;
    }
}