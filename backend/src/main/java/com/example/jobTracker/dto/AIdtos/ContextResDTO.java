package com.example.jobTracker.dto.AIdtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ContextResDTO {
    private List<Choice> choices;
}

