var id = window.location.href.split('=')[1];
 console.log("4")

 let fetchUnApprovedApartment = async () => {
    // var BASEURL = "https://localhost:7134/api/"
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


    let getAddressIndex2 = document.querySelector('.color-text-a');
    getAddressIndex2.innerHTML = `${response.data.state}, ${response.data.country}`; 

    let getPrice = document.querySelector('.money');
    console.log("price:", response.data.price)
    getPrice.innerHTML = `${response.data.price}`;


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

displayUnApprovedApartmentInfo();


console.log("seen")
let fetchCategoriesAsync = async () =>{
    let fetchCategories = await fetch("https://localhost:7134/api/Category/GetAllCategorys");
    let jsonCategories = fetchCategories.json();
    console.log(jsonCategories);
    return jsonCategories;
}
let displayCategoriesDropdown = async () => {
    let showDropdown = document.querySelector("#drop-Down");
    let categories = await fetchCategoriesAsync();
    let datas = categories.data;
    console.log(datas);
    datas.forEach(element => {
        showDropdown.innerHTML += `<option>${element.name}</option>`
    });
}

let load;
displayCategoriesDropdown();

let changeLocation = () => {
    let getButton = document.querySelector(".show-btn");
    let getSelect = document.querySelector("#category-select");
    if(localStorage.getItem("newLandlordId") == undefined)
    {
        getButton.innerHTML = ` 
        <button type="submit" onclick="postCategory()" id="btn" class="btn btn-a">Approve</button>
        <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/AdminDashBoard/index.html">Back</a></button>`
        load = document.querySelector("#btn");
    }
    else{
        getButton.innerHTML = ` <button id="location" style="margin-left: 10pc; background-color:rgb(240, 255, 244)" type="submit" class="btn btn-a"> <a href="/LandlordDashBoard/index.html">Back</a></button> 
        <button type="submit" class="probtn btn btn-a" id=${id}>Update Apartment</button>
        `
        getSelect.innerHTML = ""
       let getprBtn = document.querySelector(".probtn")
       getprBtn.addEventListener('click', (e) => {
            window.location.href = `/UpdateApartment/index.html?id=${e.target.id}`
          })
    }
}


let postCategory = () => {
    load.innerHTML = `<div class="loading add-loading"></div>`
    let getSelectedCategory = document.querySelector("#drop-Down");
    console.log(id);
    Data = {
        apartmentId : id,
        category : getSelectedCategory.value,
    };
    console.log("1");
    console.log(Data.category);
    fetch(`https://localhost:7134/api/Apartment/AddCategoryToApartment`,
        {
            method : "Put",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(Data)
        })
        .then((response) => {
            return response.json();
        })
        .then((value) => {
            console.log(value);
            if(value.status == true)
            {
                approveAparmensAsync()
                    location.href = "/UnapprovedApartments/index.html"
            }
            else
            {
                window.alert(`${value.message}`)
            }
        })
        .catch((resp) => 
        {
            console.log(resp.error);
            // window.alert("An error occured refresh and enter informations again")
        });
        // console.log(approveAparmensAsync());
}

let approveAparmensAsync = async () => {
   fetch(`https://localhost:7134/api/Apartment/ApproveApartment/${id}`, 
        {
            method : "Put",
            headers : {
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((value) => {
            console.log(value);
            if(value.status == true)
            {
                
                if (jsonpostApartment.status == true) {
                    window.alert(value.message);
                    location.href = "/AdminDashBoard/index.html"
                }
                
            }
            else
            {
                window.alert(`${value.message}`)
            }
        })
        .catch((resp) => 
        {
            console.log(resp.error);
            // window.alert("An error occured refresh and enter informations again");
            load.innerHTML = "";
            // window.location.reload();
        });
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
        <span>${landlordInfo.data.addressDescription} ${landlordInfo.data.lga}  ${landlordInfo.data.state} State</span>
      </li>
      
      `
   

}


changeLocation();

