/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.uptc.model;

/**
 *
 * @author jimmy zea
 */
public class Vehicle {
    
    private String license_plate;
    private String mark;
    private String model;
    private String price;
    private String amount;
    private String color;
    private String category;

    public Vehicle(String license_plate, String mark, String model, String price, String amount, String color, String category) {
        this.license_plate = license_plate;
        this.mark = mark;
        this.model = model;
        this.price = price;
        this.amount = amount;
        this.color = color;
        this.category = category;
    }

    public String getLicense_plate() {
        return license_plate;
    }

    public void setLicense_plate(String license_plate) {
        this.license_plate = license_plate;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    
    
    
}


