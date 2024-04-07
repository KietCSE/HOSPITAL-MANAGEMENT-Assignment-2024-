package com.rs.rmk.btl_ltnc.model.task;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class taskModel {
    private String name;
    private String day;
    private String location;
    private String from;
    private String to;
    private String id;

    public taskModel() {}

    public taskModel(String name, String day, String location, String from, String to, String id) {
        this.name = name;
        this.day = day;
        this.location = location;
        this.from = from;
        this.to = to;
        this.id = id;
    }
}
