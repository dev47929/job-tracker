package com.example.jobTracker.Entity.subClasses;

public enum Status {

    INTERVIEW_SCHEDULED("Interview Scheduled"),
    APPLIED("Applied"),
    REJECTED("Rejected"),
    WAITING("Waiting for reply"),
    GHOSTED("Ghosted");
    private String status;

    Status(String label) {
        this.status = label;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String st) {
        this.status = st;
    }
}
