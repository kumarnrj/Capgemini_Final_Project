package com.carWashSystem.userservice.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "User")
public class User {

    @Id
    private  String _id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Address Address;
    private String Phone;
    private String role="ROLE_USER";
    private boolean isAccountNonExpired=true;
    private boolean isAccountNonLocked=true;
    private boolean isCredentialsNonExpired=true;
    private boolean isEnabled=true;

    public User(){}

    public User(String _id, String firstName, String lastName, String email, String password, Address address, String phone) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        Address = address;
        Phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String id) {
        _id = id;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getAddress() {
        return Address;
    }

    public void setAddress(Address address) {
       this.Address = address;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public User(String _id, String firstName, String lastName, String email, String password, com.carWashSystem.userservice.model.Address address, String phone, String role, boolean isAccountNonExpired, boolean isAccountNonLocked, boolean isCredentialsNonExpired, boolean isEnabled) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        Address = address;
        Phone = phone;
        this.role = role;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "_id='" + _id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", Address=" + Address +
                ", Phone='" + Phone + '\'' +
                ", role='" + role + '\'' +
                ", isAccountNonExpired=" + isAccountNonExpired +
                ", isAccountNonLocked=" + isAccountNonLocked +
                ", isCredentialsNonExpired=" + isCredentialsNonExpired +
                ", isEnabled=" + isEnabled +
                '}';
    }
}
