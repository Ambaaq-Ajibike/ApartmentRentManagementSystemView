
var BASEURL = 'https://localhost:7134/api'
let showError = document.querySelector("#err-message");
let load = document.querySelector("#btn");
let SubmitUtilityForm = () =>{
    load.innerHTML = `<div class="loading add-loading"></div>`
    newArr.forEach(element => {
            
        Data = {
            name: element.name,
            quantity: element.amount,
            description: "description",
            apartmentId: localStorage.getItem("aparmentId")
          };
          fetch(`${BASEURL}/Utility/AddUtility`,
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