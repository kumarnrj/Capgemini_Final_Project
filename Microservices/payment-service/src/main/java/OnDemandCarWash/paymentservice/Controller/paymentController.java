package OnDemandCarWash.paymentservice.Controller;

import OnDemandCarWash.paymentservice.Model.Payment;
import OnDemandCarWash.paymentservice.Repository.PaymentRepo;
import OnDemandCarWash.paymentservice.Service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.apache.http.Header;
import org.apache.tomcat.util.http.parser.Authorization;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
public class paymentController {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * /payment and   /admin   are only for the testing purpose
     * @return
     */
    @GetMapping("/payment")
    public String getPayment(){
        return "Hello from payment service";
    }

    @GetMapping("/admin")
    public String getAdmin(){

        return "Hello admin from payment-service";
    }


    @GetMapping("/allPayment")
    public List<Payment> getAllPayment(){
        return paymentService.getAllPayment();
    }

//    @GetMapping("/paymentByCustomerId")
//    public String getPaymentByCustomer(HttpServletRequest request){
//        //final String authorizationHeader = request("Authorization");
//          //String username= restTemplate.getForObject("http://localhost:8100/currentUser",String.class);
//        System.out.println(request);
//          return  "hello";
//    }
//




    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String,Object> amount) throws RazorpayException {

        int amt = Integer.parseInt(amount.get("amount").toString());
       RazorpayClient client= new RazorpayClient("rzp_test_X1lxqLWC24TOBN","WGv99CTyoV9FmJFBJmuwj1MA");

        JSONObject ob = new JSONObject();
        ob.put("amount",amt*100);
        ob.put("currency","INR");
        ob.put("receipt","TXN_123");

        // creating order
        Order order = client.Orders.create(ob);

       // creating payment instance to save the data

        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(order.get("amount").toString());
        payment.setCustOrderId("6050caa733f752afd596a24e");
        payment.setPaymentId("");
        payment.setStatus(order.get("status"));

        // saving to the database
        paymentService.addPayment(payment);

        System.out.println(order);
        return  order.toString();
    }

    @PostMapping("/update_order")
    public ResponseEntity<?> updateOrder(@RequestBody Map<String,Object> data){

        Payment payment= paymentRepo.findById(data.get("order_id").toString()).get();


        System.out.println(payment);
        payment.setPaymentId(data.get("payment_id").toString());
        payment.setStatus(data.get("status").toString());
        paymentRepo.save(payment);
        return ResponseEntity.ok("");

    }
}
