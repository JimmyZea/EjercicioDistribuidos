/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.uptc.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author jimmy zea
 */
public class VehicleDAO {
    
    private ConnectDB connect;

    public VehicleDAO() {
        connect = new ConnectDB();
    }

    public ResultSet loadVehicles() throws SQLException {
        if (connect.isConnect()) {
            Statement statement = connect.getConnection().createStatement();
            return statement.executeQuery("select * from vehicles");
        }

        return null;
    }
    
}
