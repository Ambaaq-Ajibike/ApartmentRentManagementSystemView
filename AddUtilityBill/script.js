
var BASEURL = 'https://localhost:7134/api'
let showError = document.querySelector("#err-message");
let getBanks = document.querySelector("#banks")
let getAccN = document.querySelector("#acc")
let load = document.querySelector("#btn");
let newload = document.querySelector("#new-btn");


let newArr3 = [];
var addData3 = () => {
    
    let UtilitynameOnly = document.querySelector("#Utilityname");
    let UtilitydescriptionOnly = document.querySelector("#Utilitydescription");
    let UtilityamountOnly = document.querySelector("#Utilityamount");
    let UtilitytableBody = document.querySelector(".my-Utility-table");
    let newgetBanks = document.querySelector("#banks")
    
    let nameValue = UtilitynameOnly.value;
    console.log(nameValue);
    let descriptionValue = UtilitydescriptionOnly.value;
    let amountValue = UtilityamountOnly.value;
    let bankValue = newgetBanks.value;
    newload.innerHTML = `<div class="loading add-loading"></div>`
    validateBank(descriptionValue, bankValue);
    newload.innerHTML = `<button type="submit" onclick="addData3()" class="btn btn-primary mr-2">Add To Table</button>`;
    newArr.push({
      name : nameValue,
      amount : amountValue,
      description : descriptionValue,
      bank : bankValue
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
        <td class="data2">${a.amount}</td>
        <td class="data3">${a.description}</td>
        </tr>
        `
        num = num+1;
        console.log(num);
    })
    UtilitynameOnly.value = "";    
    UtilitydescriptionOnly.value = "";
    UtilityamountOnly.value = "";
    
}


























let SubmitUtilityForm = () =>{
    load.innerHTML = `<div class="loading add-loading"></div>`
    
    newArr.forEach(element => {
            
        Data = {
            name: element.name,
            amount: element.amount,
            accountNumber: element.description,
            apartmentId: localStorage.getItem("aparmentId"),
            bankCode: element.bank
          };
          fetch('https://localhost:7134/api/UtilityBill/AddUtilityBill',
            {
                method : "Post",
                headers : {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(Data)
                
            } )
    .then((response) => {
        return response.json();
    })
        .then((value) => {
            console.log(value); 
            if(value.status == true)
            {
                window.alert("Utility successfully added");
                location.href = "/LandlordDashBoard/index.html"
            }
            else
            {
                showError.textContent = `${value.message}`
            }
        })
        .catch((resp) => 
        {
            console.log(resp.error);
            showError.textContent = "An error occured refresh and enter informations again"
        });
    })

}

let fetBanks = async () =>{
    let banksFetch = await fetch("https://api.paystack.co/bank");
    let jsonBanks = banksFetch.json();
    return jsonBanks;
}
let displayBanks = async () => {
   let banksAndCode = await fetBanks();
   banksAndCode.data.forEach(x => {
       getBanks.innerHTML += `<option value="${x.code}">${x.name}</option>`
   })
}


let validateBank = (acn, bcode) =>{
    fetch(`https://api.paystack.co/bank/resolve?account_number=${acn}&bank_code=${bcode}`,
    {
        method : 'GET',
        headers:{
            "Authorization" : "Bearer sk_test_c43bd7866c1bd0dd38c7bfcea1c03290ae02d5d3"
        }
        
    })
    .then((response) => {
        console.log("1");
        return response.json();
    })
    .then((value) => {
        if (value.status == false) {
            // console.log()
            alert(value.message);
            location.reload();
        }
       console.log(value)
       let data = value.data;
       let name = data.account_name.split(" ");
       getFN.value = name[0];
    //    getFN.setAttribute(readonly);
       getLN.value = name[1];
    })
    .catch((resp) => 
    {
        
        // window.location.reload();
        
    })
}


