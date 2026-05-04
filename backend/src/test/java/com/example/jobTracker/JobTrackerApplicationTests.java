package com.example.jobTracker.Service;

import com.example.jobTracker.dto.AIdtos.ContextResDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AIapiServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AIapiService aIapiService;

    @Test
    void testGetAiResponse() {

        ReflectionTestUtils.setField(
                aIapiService,
                "apiKeyOrBearer",
                "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"

        );

        ContextResDTO result =
                aIapiService.getAiResponse(
                        "Applied for Google SDE Intern on April 10, 2026"
                );

        // nothing else
    }
}