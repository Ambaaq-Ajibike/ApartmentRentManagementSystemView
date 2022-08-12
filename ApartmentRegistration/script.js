const arr = [];

var addData = () => {
    let nameOnly = document.querySelector("#name");
    let descriptionOnly = document.querySelector("#description");
    let tableBody = document.querySelector(".table-body");

    let nameValue = nameOnly.value;    
    console.log(nameValue);
    let descriptionValue = descriptionOnly.value;
  arr.push({
      name : nameValue,
      description : descriptionValue
  });

  console.log(arr);
  let num = 1;
  tableBody.innerHTML = "";
  arr.forEach(a =>
    {
        tableBody.innerHTML += `
        <tr>
        <td class="data1">${num}</td>
        <td class="data1">${a.name}</td>
        <td class="data3">${a.description}</td>
        </tr>
        `
        num = num+1;
        console.log(num);
    })
    nameOnly.value = "";    
    descriptionOnly.value = "";
    amountOnly.value = "";
    
}
let newArr = [];
var addData2 = () => {
    let UtilitynameOnly = document.querySelector("#Utilityname");
    let UtilityamountOnly = document.querySelector("#Utilityamount");
    let UtilitytableBody = document.querySelector(".my-Utility-table");

    let nameValue = UtilitynameOnly.value;
    console.log(nameValue);
    let amountValue = UtilityamountOnly.value;
    newArr.push({
      name : nameValue,
      amount : amountValue,
  });
  UtilitytableBody.innerHTML = "";
  console.log(newArr);
  let num = 1;
  newArr.forEach(a =>
    {
        UtilitytableBody.innerHTML += `
        <tr>
        <td class="data1">${num}</td>
        <td class="data1">${a.name}</td>
        <td class="data1">${a.amount}</td>
        </tr>
        `
        num = num+1;
        console.log(num);
    })
    UtilitynameOnly.value = "";    
    UtilitydescriptionOnly.value = "";
    UtilityamountOnly.value = "";
    
}


