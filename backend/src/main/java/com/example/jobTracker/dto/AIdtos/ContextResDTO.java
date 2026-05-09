package com.example.jobTracker.dto.AIdtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ContextResDTO {
    private List<Choice> choices;
}

