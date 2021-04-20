package com.OnDemandCarWash.RatingReviewservice.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ReviewRating")
public class ReviewRating {

    @Id
    private  String _id;

    private  String customerId;
    private String customerName;
    private String customerEmail;
    private  String washerId;
    private  int washerRating;
    private  int serviceRating;
    private String review;

    public ReviewRating(){}

    public ReviewRating(String _id, String customerId, String customerName, String customerEmail, String washerId, int washerRating, int serviceRating, String review) {
        this._id = _id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.washerId = washerId;
        this.washerRating = washerRating;
        this.serviceRating = serviceRating;
        this.review = review;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getWasherId() {
        return washerId;
    }

    public void setWasherId(String washerId) {
        this.washerId = washerId;
    }

    public int getWasherRating() {
        return washerRating;
    }

    public void setWasherRating(int washerRating) {
        this.washerRating = washerRating;
    }

    public int getServiceRating() {
        return serviceRating;
    }

    public void setServiceRating(int serviceRating) {
        this.serviceRating = serviceRating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    @Override
    public String toString() {
        return "ReviewRating{" +
                "_id='" + _id + '\'' +
                ", customerId='" + customerId + '\'' +
                ", customerName='" + customerName + '\'' +
                ", customerEmail='" + customerEmail + '\'' +
                ", washerId='" + washerId + '\'' +
                ", washerRating=" + washerRating +
                ", serviceRating=" + serviceRating +
                ", review='" + review + '\'' +
                '}';
    }
}
