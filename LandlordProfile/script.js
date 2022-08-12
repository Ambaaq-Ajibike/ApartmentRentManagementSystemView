let getBank = document.querySelector("#bank");
let getAccN = document.querySelector("#acc-no")
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


let fetchLandlordInfo = async (landlordId) => {
    let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Landlord/GetLandLordInfo/${landlordId}`);
    let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
    return jsonUnApprovedApartmentInfo;
  }
let displayInfo = async () => {
    let landlordInfo = await fetchLandlordInfo(localStorage.getItem("userId"));
    console.log(landlordInfo);
    if(landlordInfo.data.bankName != null)
    {          
        getBank.innerHTML = `<option value="${landlordInfo.data.bankName}">${landlordInfo.data.bankName}</option>`;
    }
    getAccN.value = landlordInfo.data.accountNumber;
    getEmail.value = landlordInfo.data.email;
    getPhone.value = landlordInfo.data.phoneNumber;
    let name = landlordInfo.data.fullName.split(" ");
    getFN.value = name[0];
    getLN.value = name[1];
    getNiger.value = landlordInfo.data.country;
    // getmyState.innerHTML = `<option value="${customerInfo.data.state}">${customerInfo.data.state}</option>`;
    getmyState.value = landlordInfo.data.state;
    // getLGA.innerHTML = `<option value="${customerInfo.data.lga}">${customerInfo.data.lga}</option>`;
    getLGA.value = landlordInfo.data.lga;
    getDescription.value = landlordInfo.data.addressDescription;
    if(landlordInfo.data.image != null)
    {        
        getPicsDisplay.innerHTML += `<img style="width:10pc; height: 10pc;" src="https://localhost:7134/Images/${landlordInfo.data.image}" alt="profile"/>
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
        window.confirm("Are you sure you want to update your profile");
       

        let bankValue = getBank.value;
        let AccNValue = getAccN.value;
        validateBank(AccNValue, bankValue);
       let sendForm = new FormData(myForm);
       console.log(sendForm);

        fetch(`https://localhost:7134/api/Landlord/UpdateLandlord/${localStorage.getItem("userId")}`,
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
                window.location.href = "/LandlordDashBoard/index.html";
            }
            else{
                console.log("3");
                swal(value.message); 
                window.location.reload();
            }
        })
        .catch((resp) => 
        {
            swal("An error occured pls try again");
            window.location.reload();
            
        })

    }
 

    let validateBank = (acn, bcode) => {
        load.innerHTML = `<div class="loading add-loading"></div>`
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
            console.log(value)
            if (value.status == true) {
                console.log("gftgyhjhgtftfyg")
                
                let confirmName = confirm(`Are you ${value.data.account_name}`);
                if (confirmName = false) {
                    window.reload();
                }
               
                Submit();
                
            }
            else
            {
                swal(value.message);
                window.reload();
            }
        })
        .catch((resp) => 
        {
            swal(resp);
            window.reload();
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
       getBank.innerHTML += `<option value="${x.code}">${x.name}</option>`
   })
}

    let dNAme = () => {
        let bankValue = getBank.value;
        let AccNValue = getAccN.value;
        validateBank(AccNValue, bankValue);
    }