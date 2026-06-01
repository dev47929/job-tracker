package com.example.jobTracker.Service;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.dto.AIdtos.ContextResDTO;
import com.example.jobTracker.dto.AIdtos.matchJobs.MatchJobsResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AIapiService {

    @Value("${openrouter.api.key}")
    private String apiKeyOrBearer;

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final WebClient.Builder webClientBuilder;
    private final String url = "https://openrouter.ai/api/v1/chat/completions";
    private final String base_url ="https://api.groq.com/openai/v1";
    private final String groqUrl = "https://api.groq.com/openai/v1/chat/completions";
    private final String matchJobsSystemPrompt = """
            You are a JSON API.

Return ONLY valid JSON.

Do not explain anything.
Do not use markdown.
Do not wrap in ```json.

You are an expert technical recruiter and ATS evaluator.

Your task is to compare a candidate's resume against a job description and evaluate how well they match.

Analyze:
1. Skills match
2. Experience match
3. Education match
4. Relevant projects
5. Missing requirements
6. Strengths
7. Weaknesses

Rules:
- Base your analysis only on information present in the resume and job description.
- Do not invent qualifications, experience, or skills.
- If information is missing, state that it is not mentioned.
- Be objective and concise.
- Provide a match score from 0 to 100.
- Explain the score.

Return ONLY valid JSON in the following format:

{
  "matchPercentage": 0,
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "missingRequirements": [],
  "relevantSkills": [],
  "relevantProjects": [],
  "recommendations": []
}
            """;
    private final String systemPrompt = """  
You are a JSON API.

Return ONLY valid JSON.

Do not explain anything.
Do not use markdown.
Do not wrap in ```json.

Return a JSON array of JobStatus objects.

Example:
[
  {
    "company": "Google",
    "status": "APPLIED",
    "appliedOn": "2026-05-29",
    "role": "Software Engineer"
  }
]
""";

    public List<JobStatus> getOpenRouterResponse(String context){
        String actualUrl = url;
        String model = "deepseek/deepseek-v4-flash:free";
        String authHeaderValue = "Bearer " + apiKeyOrBearer;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", authHeaderValue);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        //Now comes the main part , maintain messages and store current request

        HashMap<String , String> mp = new HashMap<>();
        mp.put("role" , "user");
        mp.put("content", systemPrompt+context);
        
        HashMap<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(mp));
        if (actualUrl.contains("openrouter.ai")) {
            body.put("include_reasoning", false);
        }

        HttpEntity<HashMap<String, Object>> entity =
                new HttpEntity<>(body, httpHeaders);

        try {
            System.out.println("Routing AI Request to: " + actualUrl + " using model: " + model);
            ResponseEntity<ContextResDTO> response = restTemplate.exchange(
                    actualUrl,
                    HttpMethod.POST,
                    entity,
                    ContextResDTO.class
            );
            System.out.println("Status Code: " + response.getStatusCode());
            System.out.println("RAW RESPONSE:");
            System.out.println(response.getBody());
            ContextResDTO responseBody = response.getBody();
            if (responseBody == null || responseBody.getChoices() == null || responseBody.getChoices().isEmpty()) {
                throw new RuntimeException("AI API returned empty response");
            }
            String res = responseBody.getChoices()
                    .get(0)
                    .getMessage()
                    .getContent();

            res = res.replace("```json", "")
                    .replace("```", "")
                    .trim();

            System.out.println(res);
            
            // Configure ObjectMapper to ignore unknown properties for robustness
            objectMapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            
            return objectMapper.readValue(res, new TypeReference<List<JobStatus>>() {});
        } catch (Exception e) {
            System.err.println("Primary AI call to " + actualUrl + " failed: " + e.getMessage());
            
            // FALLBACK TO GROQ!
            // If the primary call fails due to DNS issues (UnknownHostException) or any other exception,
            // we check if we have a Groq key configured and attempt fallback to ensure seamless operation.
            if (groqApiKey != null && !groqApiKey.isEmpty() && !groqApiKey.contains("YOUR_")) {
                System.out.println("Attempting fallback using Groq API...");
                try {
                    return getGroqApiResponse(context);
                } catch (Exception fallbackEx) {
                    System.err.println("Groq fallback also failed: " + fallbackEx.getMessage());
                }
            }
            
            // Re-throw if fallback is not available or also failed
            if (e instanceof RuntimeException) {
                throw (RuntimeException) e;
            }
            throw new RuntimeException("AI service request failed", e);
        }
    };

    public List<JobStatus> getGroqApiResponse(String context) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(groqApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HashMap<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", systemPrompt + context);

        HashMap<String, Object> body = new HashMap<>();
        body.put("model", "llama-3.1-8b-instant");
        body.put("messages", List.of(message));

        HttpEntity<HashMap<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<ContextResDTO> response =
                restTemplate.exchange(
                        "https://api.groq.com/openai/v1/chat/completions",
                        HttpMethod.POST,
                        entity,
                        ContextResDTO.class
                );
        ContextResDTO responseBody = response.getBody();
        if (responseBody == null
                || responseBody.getChoices() == null
                || responseBody.getChoices().isEmpty()) {
            return List.of();
        }
            System.out.println("Successfully retrieved AI API response");
        try {
            String res = responseBody.getChoices()
                    .get(0)
                    .getMessage()
                    .getContent();
            res = res.replace("```json", "")
                    .replace("```", "")
                    .trim();
            // Configure ObjectMapper to ignore unknown properties for robustness
            objectMapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            return objectMapper.readValue(
                    res,
                    new TypeReference<List<JobStatus>>() {}
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    public MatchJobsResponseDto matchJob(String context) {
        HttpEntity<Map<String, Object>> entity = buildRequest(matchJobsSystemPrompt + context);

        try {
            ResponseEntity<ContextResDTO> response = restTemplate.exchange(
                    groqUrl, HttpMethod.POST, entity, ContextResDTO.class);

            String content = extractContent(response.getBody());
            return parseJson(content, MatchJobsResponseDto.class);

        } catch (Exception e) {
            throw new RuntimeException("Groq matchJob request failed", e);
        }
    }


    private HttpEntity<Map<String, Object>> buildRequest(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(groqApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "llama-3.1-8b-instant",
                "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        return new HttpEntity<>(body, headers);
    }

    private String extractContent(ContextResDTO responseBody) {
        if (responseBody == null
                || responseBody.getChoices() == null
                || responseBody.getChoices().isEmpty()) {
            return "{}";
        }

        return responseBody.getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }

    private <T> T parseJson(String raw, Class<T> type) throws JsonProcessingException {
        String cleaned = raw.replace("```json", "").replace("```", "").trim();
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        return objectMapper.readValue(cleaned, type);
    }
}
