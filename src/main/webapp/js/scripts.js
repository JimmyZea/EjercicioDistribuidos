/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function refreshTable(license_plate, mark, model, price, amount, color, category, table) {

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

    if (table === 0) {
        document.getElementById('tblBody').append(row);
    } else {
        document.getElementById('tblBody-2').append(row);
    }

}

function loadVehicles() {
    const $elemento = document.querySelector("#tblBody");
    let quantV = 0;
    let priceV = 0;
    $elemento.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `ControlDB?option=0`, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(typeof xhr.responseText);
            let vehicles = JSON.parse(xhr.responseText);
            vehicles.forEach(vehicle => {
                priceV += parseInt(vehicle.price);
                quantV += parseInt(vehicle.amount);
                let license_plate = vehicle.license_plate;
                let mark = vehicle.mark;
                let model = vehicle.model;
                let price = vehicle.price;
                let amount = vehicle.amount;
                let color = vehicle.color;
                let category = vehicle.category;
                refreshTable(license_plate, mark, model, price, amount, color, category, 0);
            });

            document.getElementById('quantV').innerHTML = 'Cantidad de Vehiculos: ' + quantV;
            document.getElementById('priceVT').innerHTML = 'Precio Total : $' + new Intl.NumberFormat().format(priceV);
        }
    };



    xhr.send(null);
}


function atributtes() {
    let atr = document.getElementById("atributte").value;
    let mySet = new Set();
    var vehicles = document.getElementById("select");
    vehicles.length = 0;
    var xhr = new XMLHttpRequest();
    const atributte = document.getElementById("atributte").value;
    xhr.open("GET", `ControlDB?option=0`, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const records = JSON.parse(xhr.responseText);
            records.forEach(typ => {
                mySet.add(atributte === "mark" ? typ.mark : atributte === "model" ? typ.model : atributte === "color" ? typ.color : typ.category);
            });
            let option1 = document.createElement("option");
            option1.setAttribute("value", "");
            option1.appendChild(document.createTextNode("Seleccione " + atr));
            vehicles.appendChild(option1);
            mySet.forEach((value) => {
                let option = document.createElement("option");
                option.setAttribute("value", value);
                option.appendChild(document.createTextNode(value));
                vehicles.appendChild(option);
            });
        }
    };
    xhr.send(null);
}

function downloadAtr() {
    const $elemento = document.querySelector("#tblBody-2");
    $elemento.innerHTML = "";
    atr = document.getElementById("atributte").value;
    sel = document.getElementById("select").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `ControlDB?option=0`, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let vehicles = JSON.parse(xhr.responseText);
            vehicles.forEach(vehicle => {
                if (sel === (atr === "mark" ? vehicle.mark : atr === "model" ? vehicle.model : atr === "color" ? vehicle.color : vehicle.category)) {
                    let license_plate = vehicle.license_plate;
                    let mark = vehicle.mark;
                    let model = vehicle.model;
                    let price = vehicle.price;
                    let amount = vehicle.amount;
                    let color = vehicle.color;
                    let category = vehicle.category;
                    refreshTable(license_plate, mark, model, price, amount, color, category, 1);
                }
            });
        }
    };
    xhr.send(null);

}

function JSONToCSVConvertor(ReportTitle, option) {

    atr = document.getElementById("atributte").value;
    sel = document.getElementById("select").value;

    if (option !== 0 || (atr !== "" && sel !== "")) {


        var xhr = new XMLHttpRequest();
        const atributte = document.getElementById("atributte").value;
        xhr.open("GET", `ControlDB?option=0`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const arrData = JSON.parse(xhr.responseText);
                console.log(arrData[0]);
                var CSV = 'sep=,' + '\r\n\n';
                var row = ""
                let titles = ["Placa", "Marca", "Modelo", "Precio/Unidad", "Cantidad", "Color", "Categoria"];
                for (var i = 0; i < titles.length; i++) {
                    row += titles[i] + ',';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';

                var yes = false;
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";
                    for (var index in arrData[i]) {
                        if (option == 0) {
                            if (sel === (atr === "mark" ? arrData[i].mark : atr === "model" ? arrData[i].model : atr === "color" ? arrData[i].color : arrData[i].category)) {
                                row += '"' + arrData[i][index] + '",';
                                yes = true;
                            }
                        } else {
                            row += '"' + arrData[i][index] + '",';
                            yes = true;
                        }
                    }
                    if (yes) {
                        row.slice(0, row.length - 1);
                        CSV += row + '\r\n';
                    }
                    yes = false;

                }
                if (CSV == '') {
                    alert("Invalid data");
                    return;
                }
                var fileName = option === 1 ?"MyReport_":"MyReportAtt_";
                fileName += ReportTitle.replace(/ /g, "_");
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        };
        xhr.send(null);
    } else {
        alert("Seleccione el atributo y su correspondiente");
    }
}



