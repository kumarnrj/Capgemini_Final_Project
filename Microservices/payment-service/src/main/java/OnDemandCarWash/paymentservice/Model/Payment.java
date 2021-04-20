package OnDemandCarWash.paymentservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Payment")
public class Payment {

    @Id
    private String  _id;

    private String amount;
    private String custOrderId;
    private  String status;
    private  String paymentId;

    public String getRazorpayOrderId() {
        return _id;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this._id = razorpayOrderId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCustOrderId() {
        return custOrderId;
    }

    public void setCustOrderId(String custOrderId) {
        this.custOrderId = custOrderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}
