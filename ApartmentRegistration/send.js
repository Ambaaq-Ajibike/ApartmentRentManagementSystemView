 let apartment;
 let myForm = document.querySelector("#apart-registration-form");
 console.log(myForm);
 console.log(localStorage.getItem("setToken"));
 let load = document.querySelector("#btn");

 myForm.addEventListener("submit", (e) => {
     e.preventDefault();
 });
 var BASEURL = 'https://localhost:7134/api'

let houseshowError = document.querySelector("#err-message");
 let SubmitApartmentForm = () => {
    load.innerHTML = `<div class="loading add-loading"></div>`
     let sendApartmentForm = new FormData(myForm);
     console.log(sendApartmentForm);
     fetch(`${BASEURL}/Apartment/RegisterApartment`,
        {
            method : 'POST',
            body : sendApartmentForm, 
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("setToken")}`
            },
            
        })
        .then((response) => {
            return response.json();
        })
        .then((value) => {
            console.log(value); 
            localStorage.setItem("aparmentId", value.data.id);
            if(value.status == true)
            {   
                location.href = "Equipment.html"
            }
            else
            {
                window.alert(`${value.message}`); 
                window.location.reload();
            }
        })
        .catch((resp) => 
        {
            console.log(resp);
            window.alert("Unable to register try again");
            // window.location.reload();
        });
}
