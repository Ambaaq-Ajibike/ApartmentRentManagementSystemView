
let nameValue = document.querySelector("#apartnumber");
let descriptionValue = document.querySelector("#description");
let showError = document.querySelector("#err-message");

let Submit = () => {    
   Data = {
    apartmentNumber : nameValue.value,
    problemDescription : descriptionValue.value,
   };
   console.log(Data.name);
   fetch('https://localhost:7134/api/Complaint/MakeComplaint', {
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
                window.alert("Complaint as been Sent to admin")
                location.href = "/CustomerDashBoard/index.html"
            }
            else
            {
                window.alert(value.message)
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
  let fetchLandlordInfo = async (landlordId) => {
    let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Customer/GetCustomerById/${landlordId}`);
    let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
    return jsonUnApprovedApartmentInfo;
  }
let displayImage = async () => {
    let landlordInfo = await fetchLandlordInfo(localStorage.getItem("userId"));
    console.log(landlordInfo.data);
    let a = landlordInfo.data;
    console.log(a.image);
    
    let getimg = document.querySelector("#info")
    let getName = document.querySelector(".name");
     getName.textContent = a.fullName;
     console.log(a.image);
     if (a.image == "" || a.image == null || a.image == undefined) {
      getimg.innerHTML += ` <img src="/MyImg/Annotation 2022-08-02 165618.jpg" alt="">`
    }
    else{
      getimg.innerHTML += `<img src="https://localhost:7134/Images/${a.image}" alt="profile"/>`
    }
  }
  displayImage();