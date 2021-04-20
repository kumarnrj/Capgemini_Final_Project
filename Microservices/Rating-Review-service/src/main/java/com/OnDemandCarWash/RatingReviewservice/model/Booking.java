package com.OnDemandCarWash.RatingReviewservice.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Booking {


    private  String _id;

    private String customerName;
    private String customerId;
    private String washerName;
    private String washerId;
    private String status="Pending";
    private String washingDate;
    private String time;
    private  String washingType;

    public Booking(){}

    public Booking(String _id, String customerName, String customerId, String washerName, String washerId, String status, String washingDate, String time, String washingType) {
        this._id = _id;
        this.customerName = customerName;
        this.customerId = customerId;
        this.washerName = washerName;
        this.washerId = washerId;
        this.status = status;
        this.washingDate = washingDate;
        this.time = time;
        this.washingType = washingType;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getWasherName() {
        return washerName;
    }

    public void setWasherName(String washerName) {
        this.washerName = washerName;
    }

    public String getWasherId() {
        return washerId;
    }

    public void setWasherId(String washerId) {
        this.washerId = washerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getWashingDate() {
        return washingDate;
    }

    public void setWashingDate(String washingDate) {
        this.washingDate = washingDate;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWashingType() {
        return washingType;
    }

    public void setWashingType(String washingType) {
        this.washingType = washingType;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "_id='" + _id + '\'' +
                ", customerName='" + customerName + '\'' +
                ", customerId='" + customerId + '\'' +
                ", washerName='" + washerName + '\'' +
                ", washerId='" + washerId + '\'' +
                ", status='" + status + '\'' +
                ", washingDate='" + washingDate + '\'' +
                ", time='" + time + '\'' +
                ", washingType='" + washingType + '\'' +
                '}';
    }
}
