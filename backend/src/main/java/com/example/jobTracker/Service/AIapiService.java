package com.example.jobTracker.Service;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.dto.AIdtos.ContextResDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AIapiService {

    @Value("${API_KEY}")
    private String apiKeyOrBearer;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String url = "https://openrouter.ai/api/v1/chat/completions";

    public List<JobStatus> getAiResponse(String context){

        HttpHeaders httpHeaders = new HttpHeaders();
        //Authorization send karna is simple , directly use set
        httpHeaders.set("Authorization" , "Bearer " + apiKeyOrBearer);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        //Now comes the main part , maintain messages and store current request

        HashMap<String , String> mp = new HashMap<>();
        mp.put("role" , "user");
        mp.put(
                "content",
                context +
                        "\nConvert the above data into STRICT VALID JSON ARRAY format.\n" +
                        "Example:\n" +
                        "[\n" +
                        "  {\n" +
                        "    \"company\": \"Google\",\n" +
                        "    \"status\": \"Under Review\",\n" +
                        "    \"appliedOn\": \"2026-05-02\",\n" +
                        "    \"role\": \"Software Engineer Intern\"\n" +
                        "  }\n" +
                        "]\n" +
                        "Rules:\n" +
                        "- Return ONLY JSON\n" +
                        "- No explanation\n" +
                        "- Use N/A if field missing"
        );
        HashMap<String, Object> body = new HashMap<>();
        body.put("model", "deepseek/deepseek-v4-flash:free");
        body.put("messages", List.of(mp));
        body.put("include_reasoning", false);

        HttpEntity<HashMap<String, Object>> entity =
                new HttpEntity<>(body, httpHeaders);
        System.out.println(url + apiKeyOrBearer);
        ResponseEntity<ContextResDTO> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                ContextResDTO.class
        );
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println(response.getBody());
        System.out.println("RAW RESPONSE:");
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
        List<JobStatus> jobStatuses = null;
        try {
            jobStatuses = objectMapper.readValue(res, new TypeReference<List<JobStatus>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jobStatuses;
    };

}
