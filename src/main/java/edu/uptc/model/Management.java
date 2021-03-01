/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.uptc.model;

import edu.uptc.persistence.VehicleDAO;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;

/**
 *
 * @author jimmy zea
 */
public class Management {

    private ArrayList<Vehicle> vehicles;

    private VehicleDAO vdao;

    public Management() {
        vehicles = new ArrayList<>();
        vdao = new VehicleDAO();

        vehicles.add(new Vehicle("HDS988", "AUDI", "2020", "150000000", "1", "negro", "deportivo"));
        vehicles.add(new Vehicle("HDS988", "RENAULT", "2021", "100000000", "2", "azul", "campero"));
        vehicles.add(new Vehicle("JDU334", "FERRARI", "2021", "320000000", "3", "azul", "deportivo"));
        vehicles.add(new Vehicle("OSD832", "AUDI", "2022", "250000000", "5", "blanco", "deportivo"));
        vehicles.add(new Vehicle("JSD830", "FERRARI", "2022", "190000000", "5", "rojo", "gt"));

    }

    public void loadVehicles() throws SQLException {
        ResultSet rs = vdao.loadVehicles();
        while (rs.next()) {
            String license_plate = rs.getString("license_plate");
            String mark = rs.getString("mark");
            String model = rs.getString("model");
            String price = rs.getString("price");
            String amount = rs.getString("amount");
            String color = rs.getString("color");
            String category = rs.getString("category");

            vehicles.add(new Vehicle(license_plate, mark, model, price, amount, color, category));
        }
    }

    public ArrayList<Vehicle> getVehicles() {

        Collections.sort(vehicles, (o1, o2) -> {
            return o1.getLicense_plate().compareTo(o2.getLicense_plate());
        });

        return (ArrayList<Vehicle>) vehicles.clone();

    }

}
