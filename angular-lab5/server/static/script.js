"use strict";
//START OF POST 
function AddData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
           
        },
        redirect: "follow", 
        referrer: "no-referrer", 
        body: JSON.stringify(data), 
    })
        .then(response => response.json());
        
}

function PostData(){
    let fruit = document.getElementById('fruitname').value;
    let priceof = document.getElementById('fruitprice').value;
    let taxof = document.getElementById('fruittax').value;
    let quantityof = document.getElementById('fruitquantity').value;
    
    let fruits = {name:fruit, price:priceof, tax:taxof, quantity:quantityof};
    AddData("https://se3316-lab3-yallahha.c9users.io/api/items", fruits);
    //update our table for new fruit we created
    GetFruits();
}
//END OF POST

//START OF GET
function displaytable(table){
    document.getElementById(table).innerHTML += "<tr>" +
    "<td> Name </td>" +
    "<td> Price </td>" +
    "<td> Tax </td>" +
    "<td> Quantity </td>" +
    "</tr>"
}

/* used before but taken out
function deletetable(){
    var Parent = document.getElementById("fruittable");
    while(Parent.hasChildNodes())
    {
    Parent.removeChild(Parent.firstChild);
    }
}*/

function GetFruits(){
setInterval( function(){
    SetData("https://se3316-lab3-yallahha.c9users.io/api/items", function(response) {

    document.getElementById("fruittable").innerHTML = ""
    //create a varibale to hold row table number 
            let rownumber = 0;
            
            //let time = 0
            //if(time !=0){
            //    deletetable();
            response.forEach(function (item){
            ++rownumber;
            //++time;
            
            displaytable("fruittable");
            document.getElementById("fruittable").innerHTML += "<tr>" + 
            "<td id = 'item.name" + rownumber + "'>" + item.name + "</td>"+
            "<td id = 'item.price" + rownumber + "'>" + item.price + "</td>"+
            "<td> <input id = 'item.tax" + rownumber + "' type = 'text' value = " + item.tax + ">" + "</td>" +
            "<td> <input id = 'item.quantity" + rownumber + "' type = 'text' value = " + item.quantity + ">" + "</td>" +
            "<td id = 'item._id" + rownumber + "'>" + item._id + "</td>"+
            "<td id = " + rownumber + ">" + "<button onclick = 'updatetable("+ rownumber+ ")'> Update </button> " + "</td>"+
            "<td id = " + rownumber + ">" + "<button onclick = 'deleteer("+ rownumber+ ")'> Delete </button> " + "</td>"+
           "</tr>"
          
        });
        }
        )}, 5000);
}

function SetData(url = ``, callback){
    return fetch(url, {
        method: "GET", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow", 
        referrer: "no-referrer", 
       
    })
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => { 
        callback(data)
        //fetch data every 5 seconds
        });
        
}
//END OF GET