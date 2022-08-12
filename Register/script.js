let a = document.querySelector("#err-message");
let getBank = document.querySelector("#bank")
let getAccN = document.querySelector("#acc-Number")
let getFN = document.querySelector("#FirstName")
let getLN = document.querySelector("#LastName")

let load = document.querySelector("#btn");

    let myForm = document.querySelector("#registration-form");
    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    let Submit = () =>{
        
        load.innerHTML = `<div class="loading add-loading"></div>`
        
       let sendForm = new FormData(myForm);
       console.log(sendForm);

        fetch('https://localhost:7134/api/Landlord/RegisterLandlord',
        {
            method : 'POST',
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
                
                window.location.href = "/Login/index.html";
            }
            else{
                console.log("3");
                window.alert(`${value.message}`); 
                window.location.reload();
            }
        })
        .catch((resp) => 
        {
            window.alert("An error occured pls reload"); 
            window.location.reload();
            
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
                alert(value.message);
            }
           console.log(value)
           let data = value.data;
           let name = data.account_name.split(" ");
           getFN.value = name[0];
           getLN.value = name[1];
        })
        .catch((resp) => 
        {
            
            // window.location.reload();
            
        })
    }

    let dNAme = () => {
        let bankValue = getBank.value;
        let AccNValue = getAccN.value;
        validateBank(AccNValue, bankValue);
    }