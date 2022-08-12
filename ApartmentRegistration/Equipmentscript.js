var BASEURL = 'https://localhost:7134/api'
let showError = document.querySelector("#err-message");
let cookieStorage = document.cookie;
let splitCookieStorage = cookieStorage.split("=");
let load = document.querySelector("#btn");
console.log(splitCookieStorage[1])
let SubmitEquipmentForm = () => {
    load.innerHTML = `<div class="loading add-loading"></div>`
    arr.forEach(element => {
            
        Data = {
            name: element.name,
            description: element.description,
            apartmentId: localStorage.getItem("aparmentId")
          };
          console.log("arr65");
          fetch(`${BASEURL}/HouseEquipment/AddhouseEquipment`,
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
            location.href = "Utility.html"
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
    })

    });

}