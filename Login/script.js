let emailValue = document.querySelector("#email");
let passwordValue = document.querySelector("#password");
let load = document.querySelector("#btn");


let Submit = () => {
    
    console.log("seen");
   Data = {
    email : emailValue.value,
    password : passwordValue.value,
   };
   load.innerHTML = `<div class="loading add-loading"></div>`
   emailValue.textContent = "";
   passwordValue.textContent = "";
   console.log(Data.email);
   fetch('https://localhost:7134/api/Login/Login', {
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
        localStorage.setItem("setToken", value.token);
        console.log(localStorage.getItem("setToken"));
        console.log(value);
        if(value.data.status == true)
        {
                localStorage.setItem("LandlordName", value.data.userName);
                localStorage.setItem("userId",  value.data.id);
                value.data.roles.forEach(element => {
                    if (element.name == "Landlord") {
                        localStorage.setItem("newLandlordId",  value.data.id);
                        console.log("seen");
                        console.log("over");
                        location.href = "/LandlordDashBoard/index.html"
                    }
                    else if (element.name == "Admin") {
                        
                        location.href = "/AdminDashBoard/index.html"
                    }
                    else if (element.name == "Customer") {
                        localStorage.setItem("CustomerId", value.data.id);
                        location.href = "/CustomerDashBoard/index.html"
                    }
                    else
                    {
                        window.alert("You are not fully registered on this app");
                    }
                });
        }
        else
        {
            window.alert("An error occured");
        }
            
    })
    .catch((resp) => {
        window.alert("Invalid email or password");
        location.reload()
        console.log(resp.error);
    })   
}