package com.example.jobTracker.Service;

import com.example.jobTracker.dto.AIdtos.ContextReqDTO;
import com.example.jobTracker.dto.AIdtos.ContextResDTO;
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

    private final String url = "https://openrouter.ai/api/v1/chat/completions";

    public ContextResDTO getAiResponse(String context){

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
                        "\nConvert the above data into JSON format:\n" +
                        "{\n" +
                        "  \"company\": \"\",\n" +
                        "  \"status\": \"\",\n" +
                        "  \"appliedOn\": \"\",\n" +
                        "  \"role\": \"\"\n" +
                        "}\n" +
                        "Set fields as N/A if not found and remove garbage data (if any).THE RESPONSE U GIVE SHOULD STRICTLY BE A JSON ARRAY"
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
        StringBuilder stringBuilder = new StringBuilder(response.getBody().getChoices().get(0).getMessage().getContent());
        String res = stringBuilder.substring(7, stringBuilder.length()-3).toString();
          
        return null;
    };

}
