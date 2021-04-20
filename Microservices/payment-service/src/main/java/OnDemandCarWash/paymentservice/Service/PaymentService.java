package OnDemandCarWash.paymentservice.Service;

import OnDemandCarWash.paymentservice.Model.Payment;
import OnDemandCarWash.paymentservice.Repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo paymentRepo;

    public List<Payment> getAllPayment(){
        return  paymentRepo.findAll();
    }

    public Payment addPayment(Payment payment){
        return  paymentRepo.save(payment);
    }

}
