var id = window.location.href.split('=')[1];
let getchangeInnerText = document.querySelector("#changeInnerHtml");
    getchangeInnerText.innerHTML = `<a class="nav-link" href="/CustomerDashBoard/index.html">DashBoard</a>`
  
let load = document.querySelector("#btn");
 console.log("4")
 let fetchUnRentedApartment = async () => {
    let fetchUnRentedApartmentInfo = await fetch(`https://localhost:7134/api/Apartment/GetApartmentInformation/${id}`);
    let jsonUnRentedApartmentInfo = fetchUnRentedApartmentInfo.json();
    return jsonUnRentedApartmentInfo;
 }
 let getPrice = document.querySelector('.money');
let displayUnRentedApartmentInfo = async () => {
    console.log("1");
    const response = await fetchUnRentedApartment();
    console.log(response.data)


    let getAddressIndex1 = document.querySelector('.title-single');
    getAddressIndex1.innerHTML = `${response.data.lga}`;


    let getAddressIndex2 = document.querySelector('.color-text-a');
    getAddressIndex2.innerHTML = `${response.data.state}, ${response.data.country}`; 

    
    console.log("price:", response.data.price)
    getPrice.innerHTML = `${response.data.apartmentTotalPrice}`;


    let getTerms = document.querySelector("#termsandCond");
    console.log("price:", response.data.termsAndCondition)
    getTerms.innerHTML = `<img src="https://localhost:7134/Images/${response.data.termsAndCondition}" alt="">`;


    let utilityDiv = document.querySelector('.list');
    console.log("utilities:", response.data.utilities)
    response.data.utilities.forEach(element => {
        utilityDiv.innerHTML += `<li class="d-flex justify-content-between">
        <strong>${element.name}:</strong>
        <span>${element.quantity}</span>
      </li>`
    });

    let imgDiv = document.querySelector(".img-div");
    response.data.images.forEach(element => {
      if (response.data.images[response.data.images.length-1] != element) {
        
        imgDiv.innerHTML += `
        <div class="carousel-item-b">
                <img src="https://localhost:7134/Images/${element.name}" alt="">
              </div>`
      }
    });


    let equipmentsDiv = document.querySelector("#equipments");
    response.data.houseEquipments.forEach(element => {
        equipmentsDiv.innerHTML += `
        <li>${element.name}</li>`
    });
}

displayUnRentedApartmentInfo();




let fullpayment = document.querySelector("#fullPayment");

let quarterpayment = document.querySelector("#quarterPayment");
fullpayment.addEventListener(("click"), () => {
  load.innerHTML = `<div class="loading add-loading"></div>`
  let confirmPayment = confirm("Are you sure you want to pay for this apartment?");
 
  if (confirmPayment == true) {
    
        let paymentapartmentId = id;
      let paymentcustomerId = localStorage.getItem("userId");
      Data = {
        apartmentId : paymentapartmentId,
        customerId : paymentcustomerId,
        amountPaid : getPrice.innerHTML
      };
      console.log(Data.apartmentId);
      console.log(Data.customerId);
      console.log(Data.amountPaid);
      fetch('https://localhost:7134/api/Payment/MakePayment',
       {
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
          console.log(value)
          if (value.status == true) {
            // alert(value.message);
            location.replace(value.data.authorization_url);
            // payment.innerHTML = "";
          }
          else
          {
            alert(value.message);
          }
        })
        .catch((r) => {
          alert("An error occured try again")
        })
   } else{
    location.reload();
   }
  }
);
let changeLocation = () => {
  let myButton = document.querySelector("#sbt");
  console.log("CustomerId", localStorage.getItem("CustomerId"))
  if(localStorage.getItem("CustomerId") == undefined || localStorage.getItem("CustomerId") == null)
  {
      myButton.innerHTML = ` 
      <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/AdminDashBoard/index.html">Back</a></button>`

  }
 
  
}
changeLocation();

let payhalf = document.querySelector("#halfPayment");
payhalf.addEventListener(("click"), () => {
  load.innerHTML = `<div class="loading add-loading"></div>`
  let confirmPayment = confirm("Are you sure you want to pay for this apartment?");
 
  if (confirmPayment == true) {
    
        let paymentapartmentId = id;
      let paymentcustomerId = localStorage.getItem("userId");
      Data = {
        apartmentId : paymentapartmentId,
        customerId : paymentcustomerId,
        amountPaid : getPrice.innerHTML / 2
      };
      console.log(Data.apartmentId);
      console.log(Data.customerId);
      console.log(Data.amountPaid);
      fetch('https://localhost:7134/api/Payment/MakePayment',
       {
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
          console.log(value)
          if (value.status == true) {
            // alert(value.message);
            location.replace(value.data.authorization_url);
          }
          else
          {
            alert(value.message);
          }
        })
        .catch((r) => {
          alert("An error occured try again")
        })

   }
   else{
    location.reload();
   }
  }
  
);


quarterpayment.addEventListener(("click"), () => {
  load.innerHTML = `<div class="loading add-loading"></div>`
  let confirmPayment = confirm("Are you sure you want to pay?");
 
  if (confirmPayment == true) {
    
        let paymentapartmentId = id;
      let paymentcustomerId = localStorage.getItem("userId");
      Data = {
        apartmentId : paymentapartmentId,
        customerId : paymentcustomerId,
        amountPaid : getPrice.innerHTML/4
      };
      console.log(Data.apartmentId);
      console.log(Data.customerId);
      console.log(Data.amountPaid);
      fetch('https://localhost:7134/api/Payment/MakePayment',
       {
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
          console.log(value)
          if (value.status == true) {
            // alert(value.message);
            location.replace(value.data.authorization_url);
          }
          else
          {
            alert(value.message);
          }
        })
        .catch((r) => {
          alert("An error occured try again")
        })

   } else{
    location.reload();
   }
  }
);
