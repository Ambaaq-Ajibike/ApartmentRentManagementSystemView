var id = window.location.href.split('=')[1];

let getButton = document.querySelector(".show-btn");
    if(localStorage.getItem("newLandlordId") != undefined)
    {
      getButton.innerHTML = ` <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/LandlordDashBoard/index.html">Back</a></button> 
        <button type="submit" class="probtn btn btn-a" id=${id}>Update Apartment</button>
        `
        let getprBtn = document.querySelector(".probtn")
        getprBtn.addEventListener('click', (e) => {
              window.location.href = `/UpdateApartment/index.html?id=${e.target.id}`
          })
        
    }
   else if(localStorage.getItem("CustomerId") != undefined)
    {
        getButton.innerHTML = ` 
        <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/CustomerDashBoard/index.html">Back</a></button>`
        load = document.querySelector("#btn");
    }
    else{
      getButton.innerHTML = ` 
      <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/ApprovedApartments/index.html">Back</a></button>`
      load = document.querySelector("#btn");
    }
 console.log("4")
 let fetchUnApprovedApartment = async () => {
    // var BASEURL = "https ://localhost :7134/api/"
    let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Apartment/GetApartmentInformation/${id}`);
    let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
    return jsonUnApprovedApartmentInfo;
 }

let displayUnApprovedApartmentInfo = async () => {
    console.log("1");
    const response = await fetchUnApprovedApartment();
    console.log(response.data)


    let getAddressIndex1 = document.querySelector('.title-single');
    getAddressIndex1.innerHTML = `${response.data.lga}`;

    let apar = document.querySelector('#apartId');
    // console.log(splitAddress[1]);
    apar.innerHTML = `No: ${response.data.apartmentNumber}`;


    let getAddressIndex2 = document.querySelector('.color-text-a');
    getAddressIndex2.innerHTML = `${response.data.state}, ${response.data.country}`; 

    let getPrice = document.querySelector('.money');
    console.log("price :", response.data.price)
    getPrice.innerHTML = `${response.data.price}`;


    let getTerms = document.querySelector("#termsandCond");
    getTerms.innerHTML = `<img src="https://localhost:7134/Images/${response.data.termsAndCondition}" alt="">`;


    let utilityDiv = document.querySelector('#quick-summary');
    console.log("utilities :", response.data.utilities)
    response.data.utilities.forEach(element => {
        utilityDiv.innerHTML += `<li class="d-flex justify-content-between">
        <strong>${element.name} :</strong>
        <span>${element.quantity}</span>
      </li>`
    });


    let equipmentsDiv = document.querySelector("#equipments");
    response.data.houseEquipments.forEach(element => {
        equipmentsDiv.innerHTML += `
        <li>${element.name}</li>`
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
    displayLandlordInfo(response.data.landlordId);
}

let fetchLandlordInfo = async (landlordId) => {
    let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Landlord/GetLandLordById/${landlordId}`);
    let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
    return jsonUnApprovedApartmentInfo;
}

let displayLandlordInfo = async (landlordId) =>{
    let landlordInfo = await fetchLandlordInfo(landlordId);
    console.log("landlordInfo", landlordInfo);
    let landlordDiv = document.querySelector('#landlord-info');
    landlordDiv.innerHTML += `
    <li class="d-flex justify-content-between">
        <strong>Name :</strong>
        <span>${landlordInfo.data.fullName}</span>
      </li>
    <li class="d-flex justify-content-between">
        <strong>Email Address :</strong>
        <span>${landlordInfo.data.email}</span>
      </li>

    <li class="d-flex justify-content-between">
        <strong>Phone Number :</strong>
        <span>${landlordInfo.data.phoneNumber}</span>
      </li>
    <li class="d-flex justify-content-between">
        <strong>Address :</strong>
        <span> ${landlordInfo.data.lga},  ${landlordInfo.data.state}</span>
      </li>
      
      `
    ;

}


displayUnApprovedApartmentInfo();
if (localStorage.getItem("newLandlordId") != undefined) {

}