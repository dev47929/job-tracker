package com.example.jobTracker.Service;

import com.example.jobTracker.dto.AIdtos.ContextReqDTO;
import com.example.jobTracker.dto.AIdtos.ContextResDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.server.reactive.HttpHandler;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class AIapiService {

    @Value("${API_KEY}")
    private String apiKeyOrBearer;

    private final RestTemplate restTemplate;

    private final String url = "https://openrouter.ai/api/v1/chat/completions";


    public ContextResDTO getAiResponse(String context){
        ContextReqDTO contextReqDTO = new ContextReqDTO(context);

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
                        "Set fields as N/A if not found."
        );


        // Request body
        HashMap<String, Object> body = new HashMap<>();
        body.put("model", "tencent/hy3-preview:free");
        body.put("messages", mp);

        // Full request entity
        HttpEntity<HashMap<String, Object>> entity =
                new HttpEntity<>(body, httpHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
        );
        System.out.println("Function Executed");
        System.out.println("Status Code: " + response.getStatusCode());

        System.out.println("RAW RESPONSE:");
        System.out.println(response.getBody());

        return null;
    };

}
