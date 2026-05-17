package com.example.jobTracker.ServiceTest;

import com.example.jobTracker.Service.AIapiService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AIapiServiceTest {

    @Autowired
    private AIapiService aIapiService;

    @Mock
    private RestTemplate restTemplate;



    private String testContext = "ID,Company,Role,Location,Status,Applied Date,Salary,Type\n" +
            "1,Google,Software Engineer Intern,Bangalore India,Applied,1 May 2026,₹12 LPA,Internship\n" +
            "2,Microsoft,Frontend Developer Intern,Hyderabad India,Interview Scheduled,28 Apr 2026,₹10 LPA,Internship\n" +
            "3,Amazon,Backend Developer,Remote,Rejected,20 Apr 2026,₹18 LPA,Full Time\n" +
            "4,Flipkart,SDE-1,Bangalore India,OA Cleared,3 May 2026,₹14 LPA,Full Time\n" +
            "5,Zomato,React Developer,Gurgaon India,Under Review,5 May 2026,₹9 LPA,Internship\n" +
            "6,Infosys,System Engineer,Pune India,Shortlisted,30 Apr 2026,₹6 LPA,Full Time\n" +
            "7,TCS,Java Developer,Indore India,Applied,7 May 2026,₹5 LPA,Full Time\n" +
            "8,Swiggy,Full Stack Developer Intern,Remote,Interview Completed,2 May 2026,₹8 LPA,Internship";


    @Test
    public void AiTest(){
        aIapiService.getGroqApiResponse(testContext);
    };
}
