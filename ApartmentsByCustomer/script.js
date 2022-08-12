var id = window.location.href.split('=')[1];
// console.log(window.location.href);
console.log(localStorage.getItem("Landlord"));
let titleH = document.querySelector("#title");
titleH.textContent = localStorage.getItem("Landlord");


console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchApprovedApartments = async () => {
  let unApprovedApartments = await fetch(`${BASEURL}Customer/GetApartmentsByCustomerId/${localStorage.getItem("CustomerId")}`);
  let jsonUnApprovedApartments = await unApprovedApartments.json();
  console.log(jsonUnApprovedApartments); 
  return jsonUnApprovedApartments;
} 
let displayApartments = async () => {
    console.log("1");
    let count = 0;
    const response = await fetchApprovedApartments();
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count ++;
       
          tableData.innerHTML += `<tr>
                  <td>Apartment ${count}</td>
                  <td><button class="my-btn btn btn-primary mr-2" id=${element.id}>Info</button></td>
          </tr>`
   

  });
  redirect1();
}
const redirect1 = () => {
  buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/ApprovedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}
const redirect2 = () => {
  buttons = document.querySelectorAll(".my-approvedbtn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/UnApprovedApartmentsInfo/index.html?id=${e.target.id}`
    })
  })
}
const redirect3 = () => {
  buttons = document.querySelectorAll(".my-Paymentbtn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/PaymentByCustomer/index.html?id=${e.target.id}`
    })
  })
}
displayApartments();

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
   if (a.image != "") {
    getimg.innerHTML += `<img src="https://localhost:7134/Images/${a.image}" alt="profile"/>`
  }
  else{
    getimg.innerHTML += ` <img src="/MyImg/Annotation 2022-08-02 165618.jpg" alt="">`
  }
}
displayImage();