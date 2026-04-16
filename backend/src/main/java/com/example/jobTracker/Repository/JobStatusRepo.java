package com.example.jobTracker.Repository;

import com.example.jobTracker.Entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStatusRepo extends JpaRepository<JobStatus, Long> {

}
