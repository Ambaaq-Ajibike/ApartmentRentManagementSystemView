var id = window.location.href.split('=')[1];
 let apartment;
 let load = document.querySelector("#btn");

 let myForm = document.querySelector("#apart-registration-form");
 myForm.addEventListener("submit", (e) => {
     e.preventDefault();
 });
 var BASEURL = 'https://localhost:7134/api'

 let SubmitApartmentForm = () => {
    load.innerHTML = `<div class="loading add-loading"></div>`
     let sendApartmentForm = new FormData(myForm);
     console.log(sendApartmentForm);
     fetch(`${BASEURL}/Apartment/UpdateApartment/${id}`,
        {
            method : 'PUT',
            body : sendApartmentForm
        })
        .then((response) => {
            return response.json();
        })
        .then((value) => {
            console.log(value); 
            localStorage.setItem("aparmentId", id);
            if(value.status == true)
            {
                location.href = "/LandlordDashBoard/index.html"
               let amen = window.confirm("Did you want to add new equipment?");
                if (amen == true) {
                    localStorage.setItem("aparmentId", id);
                    location.href = "/ApartmentRegistration/Equipment.html"
                }
                else{
                    location.href = "/LandlordDashBoard/index.html"
                }
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
            window.alert("Unable to update try again");
            // window.location.reload();
        });
}
