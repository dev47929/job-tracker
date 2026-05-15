package com.example.jobTracker.Service;

import com.example.jobTracker.Entity.JobStatus;
import com.example.jobTracker.dto.AIdtos.ContextReqDTO;
import com.example.jobTracker.dto.AIdtos.ContextResDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.lang.runtime.ObjectMethods;
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
                        "- No markdown\n" +
                        "- No explanation\n" +
                        "- Use N/A if field missing"
        );
        HashMap<String, Object> body = new HashMap<>();
        body.put("model", "inclusionai/ring-2.6-1t:free");
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
        System.out.println("RAW RESPONSE:");
        String res = response.getBody()
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();

        res = res.replace("```json", "")
                .replace("```", "")
                .trim();


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
