/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.uptc.persistence;

import java.sql.PreparedStatement;
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
            String sql = "select * from vehicles";
            PreparedStatement pt = connect.getConnection().prepareCall(sql);
            //Statement statement = connect.getConnection().createStatement();
            //return pt.executeQuery("select * from vehicles");
            return pt.executeQuery();
        }

        return null;
    }
    
}
