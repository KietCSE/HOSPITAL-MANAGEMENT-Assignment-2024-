package com.rs.rmk.btl_ltnc.model.login;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Datalogin {

    private String account;

//    @Size(min = 8, message = "Mat khau co it nhat 8 ky tu")
    private String password;
}
