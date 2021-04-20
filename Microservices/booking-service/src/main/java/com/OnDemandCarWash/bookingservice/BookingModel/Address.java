package com.OnDemandCarWash.bookingservice.BookingModel;

public class Address {
    private String pincode;
    private String city;
    private String street;
    private String state;

    public Address(){}

    public Address(String pincode, String city, String street, String state) {
        this.pincode = pincode;
        this.city = city;
        this.street = street;
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Address{" +
                "pincode='" + pincode + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", state='" + state + '\'' +
                '}';
    }
}
