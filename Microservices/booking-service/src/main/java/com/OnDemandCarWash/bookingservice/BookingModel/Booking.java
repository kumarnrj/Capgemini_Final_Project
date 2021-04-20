package com.OnDemandCarWash.bookingservice.BookingModel;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Booking")
public class Booking {

    @Id
    private  String _id;

    private String customerName;
    private String customerId;
    private String washerName;
    private String washerId;
    private String status="PENDING";
    private String washingDate;
    private String time;
    private  String washingType;
    private String carModal;
    private String carNumber;
    private String paymentStatus;
    private Address address;


    public Booking(){}

    public Booking(String _id, String customerName, String customerId, String washerName, String washerId, String status, String washingDate, String time, String washingType, String carModal, String carNumber, String paymentStatus, Address address) {
        this._id = _id;
        this.customerName = customerName;
        this.customerId = customerId;
        this.washerName = washerName;
        this.washerId = washerId;
        this.status = status;
        this.washingDate = washingDate;
        this.time = time;
        this.washingType = washingType;
        this.carModal = carModal;
        this.carNumber = carNumber;
        this.paymentStatus = paymentStatus;
        this.address = address;
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

    public void setStatus(String status)
    {
        this.status = status.toUpperCase();
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

    public String getCarModal() {
        return carModal;
    }

    public void setCarModal(String carModal) {
        this.carModal = carModal;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
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
                ", carModal='" + carModal + '\'' +
                ", carNumber='" + carNumber + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                ", address=" + address +
                '}';
    }
}
