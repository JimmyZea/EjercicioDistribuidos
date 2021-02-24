/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function refreshTable(license_plate, mark, model, price, amount, color, category) {

    var row = document.createElement("tr");
    var col = document.createElement("td");
    col.append(document.createTextNode(license_plate));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(mark));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(model));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(price));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(amount));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(color));
    row.append(col)

    col = document.createElement('td');
    col.append(document.createTextNode(category));
    row.append(col)

    document.getElementById('tblBody').append(row);
}


function loadVehicles() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `ControlDB?option=0`, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let vehicles = JSON.parse(xhr.responseText);
            vehicles.forEach(vehicle => {
                let license_plate = vehicle.license_plate;
                let mark = vehicle.mark;
                let model = vehicle.model;
                let price = vehicle.price;
                let amount = vehicle.amount;
                let color = vehicle.color;
                let category = vehicle.category;
                refreshTable(license_plate, mark, model, price, amount, color, category);
            });
        }
    };
    xhr.send(null);
}

