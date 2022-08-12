
let nameValue = document.querySelector("#name");
let descriptionValue = document.querySelector("#description");
let rateValue = document.querySelector("#rate");
let showError = document.querySelector("#err-message");

let Submit = () => {    
   Data = {
    name : nameValue.value,
    description : descriptionValue.value,
    rate : rateValue.value,
   };
   console.log(Data.name);
   fetch('https://localhost:7134/api/Category/Register', {
    method : "Post",
    headers : {
        "Content-Type": "application/json"
    },
    body : JSON.stringify(Data)
   })
   .then((respose) => {
    return respose.json();
    })
    .then(function (value) {
        console.log(value);
            if(value.status == true)
            {
                window.alert("Category Successfully added")
                window.location.reload();
            }
            else
            {
                showError.textContent = `${value.message}`
            }
            
    })
    .catch((resp) => {
        console.log(resp.error);
    })   
}

let logOut = () =>{
    localStorage.clear();
    window.location.href = "/index.html";
  }

  function setLandlordNae() {
    let getName = document.querySelector(".name");
     getName.textContent = localStorage.getItem("LandlordName");
  } 
  setLandlordNae();