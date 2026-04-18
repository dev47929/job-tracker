package com.example.jobTracker.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class JobStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    private String company;
    private String status;
    private LocalDate appliedOn;
    private String role;

    @ManyToOne
    @JsonBackReference
    private User user;
}
