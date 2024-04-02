package com.rs.rmk.btl_ltnc.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class GoogleInitialize  {
    @PostConstruct
    public void initial() throws IOException {
        try (FileInputStream serviceAccount = new FileInputStream(
                "./src/main/java/com/rs/rmk/btl_ltnc/config/serviceAccountKey.json")) {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
