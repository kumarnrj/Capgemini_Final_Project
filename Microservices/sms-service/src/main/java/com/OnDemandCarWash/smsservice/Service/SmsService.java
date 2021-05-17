package com.OnDemandCarWash.smsservice.Service;

import com.OnDemandCarWash.smsservice.Model.SmsBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;


@Service
public class SmsService {

    //reading the values from properties file
    @Value("${sms.apikey}")
    private String apikey;

    @Value("${sms.sendId}")
    private String sendId;

    @Value("${sms.language}")
    private String language;

    @Value("${sms.route}")
    private String route;

    @Value("${sms.url}")
    private String smsUrl;

    private  int statusCode;


// autowirig the the rest template
    @Autowired
    private RestTemplate restTemplate;



    public int sendMsg(SmsBody smsBody){
        try{

            String message = smsBody.getMsg();

            //encoding the message
            message = URLEncoder.encode(message,"UTF-8");

            // setting the url
            smsUrl = smsUrl+"authorization="+apikey+"&sender_id="+sendId+"&message="+message+"&language="+language+"&route="+route+"&numbers="+smsBody.getNumber();

            ResponseEntity<String> res = restTemplate.getForEntity(smsUrl,String.class);
            statusCode = res.getStatusCodeValue();

            // sending get request
//            URL url = new URL(smsUrl);
//            HttpsURLConnection  con = ( HttpsURLConnection)url.openConnection();
//
//            con.setRequestMethod("GET");
//
//            con.setRequestProperty("User-Agent", "Mozilla/5.0");
//            con.setRequestProperty("cache-control", "no-cache");
//
//            statusCode=con.getResponseCode();

           // StringBuffer response=new StringBuffer();

           // BufferedReader br=new BufferedReader(new InputStreamReader(con.getInputStream()));

//            while(true)
//            {
//                String line=br.readLine();
//                if(line==null)
//                {
//                    break;
//                }
//                response.append(line);
//            }
//
//            System.out.println(response);
            return statusCode;

        }catch(Exception e){
            e.printStackTrace();
            return statusCode;
        }


    }
}
