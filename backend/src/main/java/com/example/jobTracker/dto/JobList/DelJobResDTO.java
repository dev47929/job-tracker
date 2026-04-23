package com.example.jobTracker.dto.JobList;

import lombok.Data;

@Data
public class DelJobResDTO {
    private Boolean status;

    public DelJobResDTO(boolean b) {
        status=b;
    }
}
