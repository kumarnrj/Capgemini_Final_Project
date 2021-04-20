package OnDemandCarWash.paymentservice.Repository;

import OnDemandCarWash.paymentservice.Model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepo extends MongoRepository<Payment,String> {

}
