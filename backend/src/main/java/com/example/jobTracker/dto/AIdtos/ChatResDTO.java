package com.example.jobTracker.dto.AIdtos;

import lombok.Data;

import java.util.List;

@Data
public class ChatResDTO {

    private List<Output> output;

    @Data
    public static class Output {
        private List<Content> content;
    }

    @Data
    public static class Content {
        private String text;
    }
}
