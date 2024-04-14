package com.rs.rmk.btl_ltnc.model.patientinfo;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class info {
    private String id;
    @NotBlank(message = "Tên không được để trống")
    private String name;
    @NotBlank(message = "Phòng không được để trống")
    private String room;
    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^\\+?\\d{1,3}?[-. (]?\\d{1,3}[-. )]?\\d{3}[-. ]?\\d{4}$", message = "Số điện thoại không hợp lệ")
    private String phone_number;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @NotNull(message = "Năm sinh không được để trống")
    @Min(value = 1900, message = "Năm phải từ 1900 đến 2024")
    @Max(value = 2024, message = "Năm phải từ 1900 đến 2024")
    private Integer b_day;
    private String status;
    private String treatment_schedule;
    private String medical_history;
    private String dr;

    @Min(value = 0, message = "Điểm đánh giá phải từ 0-100")
    @Max(value = 100, message = "Điểm đánh giá phải từ 0-100")
    private Integer comment_customer_care;
    @Min(value = 0, message = "Điểm đánh giá phải từ 0-100")
    @Max(value = 100, message = "Điểm đánh giá phải từ 0-100")
    private Integer comment_service;
    @Min(value = 0, message = "Điểm đánh giá phải từ 0-100")
    @Max(value = 100, message = "Điểm đánh giá phải từ 0-100")
    private Integer comment_attitude;
    @Min(value = 0, message = "Điểm đánh giá phải từ 0-100")
    @Max(value = 100, message = "Điểm đánh giá phải từ 0-100")
    private Integer comment_healthcare;

    private String morning;
    private String afternoon;
    private String evening;
    private String note;

}
