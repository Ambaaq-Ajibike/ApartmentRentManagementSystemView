console.log("Hello");
console.log("ersqfvhbnjw");

var customerId  = localStorage.getItem("CustomerId");
var apatmentId = window.location.href.split('=')[1];
let fetchApartmentPayment = async () => {
  var fetchApartmentPaymentByCustomer = await fetch(`https://localhost:7134/api/Payment/GetAllPaymentsByCustomer/${customerId}`);
  var jsonfetch = fetchApartmentPaymentByCustomer.json();
  console.log(jsonfetch);
  return jsonfetch;
}

let displayPaymentHistory = async () => {
  let count = 0;
  console.log("ersqfvhbnjw");
  let getTbody = document.querySelector(".table-info");
  let response = await fetchApartmentPayment();
  console.log(response);
  response.data.forEach(element => {
    count++;
    getTbody.innerHTML += `
                <tr>
                    <td>
                     ${count}
                    </td>
                    <td>
                      ${element.referrenceNumber}
                    </td>
                    <td>
                      ${element.dateOfPayment}
                    </td>
                    <td>
                      ${element.amountPaidByCustomer}
                    </td>
                    <td><button class="my-btn btn btn-primary mr-2" id=${element.apartmentId}>Info</button></td>
                </tr>
    `
  });
  redirect();
}
displayPaymentHistory();






let logOut = () => {
  localStorage.clear();
  window.location.href = "/index.html";
}

let displayDate = () => {
  var d = new Date;
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let getdate = document.querySelector("#date");
  getdate.textContent = `Today   :    ${day}/${month + 1}/${year}`
}

displayDate();


const redirect = () => {
  buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/ApprovedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}

function setLandlordNae() {
  let getName = document.querySelector("#name");
   getName.textContent = localStorage.getItem("LandlordName");
   
}
setLandlordNae();

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
  getimg.innerHTML +=  `<img src="https://localhost:7134/Images/${a.image}" alt="profile"/>`
}
displayImage();