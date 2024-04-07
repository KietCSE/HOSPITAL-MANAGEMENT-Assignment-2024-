package com.rs.rmk.btl_ltnc.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.rs.rmk.btl_ltnc.model.Item.MedicineAPIRespone;
import org.springframework.web.client.RestTemplate;

@Controller
public class WebsiteController {
    @GetMapping("/")
    public String Home(HttpServletRequest request) {
        return "/Hospital_Home/Home";
    }

    @GetMapping("/login")
    public String login(HttpServletRequest request) {
        return "/Login_Page/index";
    }

    @GetMapping("/patient/list")
    public String PatientList(HttpServletRequest request) {
        return "Manage_Patient/List_Patient/index";
    }

    @GetMapping("/patient/info")
    public String PatientInfo(HttpServletRequest request) {
        return "/Manage_Patient/Patient_Information/index";
    }

    @GetMapping("/medicine/form")
    public String MedicineForm(HttpServletRequest request) {
        return "/Manage_Medicine/medicineform";
    }

    @GetMapping("/medicine/info/{MID}")
    public String MedicineInfo(HttpServletRequest request, @PathVariable String MID) {
        RestTemplate restTemplate = new RestTemplate();
        MedicineAPIRespone medicine = restTemplate.getForObject("http://localhost:8080/api/medicine/get/" + MID,
                MedicineAPIRespone.class);
        request.setAttribute("Name", medicine.getName());
        request.setAttribute("Amount", medicine.getAmount());
        request.setAttribute("Date", medicine.getDate());
        request.setAttribute("Validated", medicine.getValidated());
        request.setAttribute("Latest_Export", medicine.getLatest_Export());
        request.setAttribute("Img", medicine.getImg());
        request.setAttribute("Type", medicine.getType());
        request.setAttribute("Description", medicine.getDescription());
        request.setAttribute("Uses", medicine.getUses());
        request.setAttribute("N_Uses", medicine.getN_Uses());
        request.setAttribute("Classify", medicine.getClassify());
        return "/Manage_Medicine/medicineinfo";
    }

    @GetMapping("/tool/form")
    public String ToolForm(HttpServletRequest request) {
        return "/Manage_Tool/devicesform";
    }

    @GetMapping("/tool/info")
    public String ToolInfo(HttpServletRequest request) {
        return "/Manage_Tool/deviceinfo";
    }

    @GetMapping("/schedule")
    public String Schedule(HttpServletRequest request) {
        return "/Schedule/index";
    }

    @GetMapping("/doctor/list")
    public String DoctorList(HttpServletRequest request) {
        return "/Manage_Doctor/Doctor_list/doctor";
    }

    @GetMapping("/doctor/info")
    public String DoctorInfo(HttpServletRequest request) {
        return "/Manage_Doctor/Doctor_info/info";
    }

}
