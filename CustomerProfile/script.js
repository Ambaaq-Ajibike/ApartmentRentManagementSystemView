let getEmail = document.querySelector("#Email");
let getFN = document.querySelector("#FirstName")
let getLN = document.querySelector("#LastName");
let getPhone = document.querySelector("#phone")
let getNiger = document.querySelector("#country");
let getmyState = document.querySelector("#state");
let getLGA = document.querySelector("#lga");
let getDescription = document.querySelector("#decription");
let getPicsDisplay = document.querySelector("#displayPics");
let getProfil = document.querySelector("#profile-picture");


let fetchcustomerInfo = async (customerId) => {
    let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/customer/GetCustomerById/${customerId}`);
    let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
    return jsonUnApprovedApartmentInfo;
  }
let displayInfo = async () => {
    let customerInfo = await fetchcustomerInfo(localStorage.getItem("userId"));
    console.log(customerInfo);
    
    getEmail.value = customerInfo.data.email;
    getPhone.value = customerInfo.data.phoneNumber;
    let name = customerInfo.data.fullName.split(" ");
    getFN.value = name[0];
    getLN.value = name[1];
    getNiger.value = customerInfo.data.country;
    // getmyState.innerHTML = `<option value="${customerInfo.data.state}">${customerInfo.data.state}</option>`;
    getmyState.value = customerInfo.data.state;
    // getLGA.innerHTML = `<option value="${customerInfo.data.lga}">${customerInfo.data.lga}</option>`;
    getLGA.value = customerInfo.data.lga;
    getDescription.value = customerInfo.data.addressDescription;
    if(customerInfo.data.image != null)
    {        
        getPicsDisplay.innerHTML += `<img style="width:10pc; height: 10pc;" src="https://localhost:7134/Images/${customerInfo.data.image}" alt="profile"/>
                                     `
    }
}
displayInfo();




let load = document.querySelector("#btn");

    let myForm = document.querySelector("#registration-form");
    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    let Submit = () =>{
        load.innerHTML = `<div class="loading add-loading"></div>`
        
       let sendForm = new FormData(myForm);
       console.log(sendForm);

        fetch(`https://localhost:7134/api/Customer/UpdateCustomer/${localStorage.getItem("userId")}`,
        {
            method : 'PUT',
            body : sendForm
            
        })
        .then((response) => {
            console.log("1");
            return response.json();
        })
        .then((value) => {
            console.log("2");
            console.log(value);

            if(value.status == true)
            {
                console.log("2");
                window.location.href = "/customerDashBoard/index.html";
            }
            else{
                console.log("3");
                window.alert(`${value.message}`); 
                window.location.reload();
            }
        })
        .catch((resp) => 
        {
            window.alert("An error occured pls try again");
            // window.location.reload();
            
        })

    }
 

    let validateBank = (acn, bcode) => {

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
                
                alert(value.message);
            }
            else
            {
                window.confirm(`Are you ${data.account_name}`);
            }
           console.log(value)
           let data = value.data;
           let name = data.account_name.split(" ");
           getFN.value = name[0];
           getLN.value = name[1];
        })
        .catch((resp) => 
        {
            
            
            
        })
    }

    let dNAme = () => {
        let bankValue = getBank.value;
        let AccNValue = getAccN.value;
        validateBank(AccNValue, bankValue);
    }