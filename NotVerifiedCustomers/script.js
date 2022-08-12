console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchLandlords = async () => {
  let unLandlords = await fetch(`${BASEURL}Customer/GetNotVerifiedCustomers`);
  let jsonUnLandlords = await unLandlords.json();
  console.log(jsonUnLandlords); 
  return jsonUnLandlords;
} 
let displayAllLandlords = async () => {
    console.log("1");
    let count = 0;
    const response = await fetchLandlords();
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count++;
    tableData.innerHTML += `<tr>
            <td>${count}</td>
            <td>${element.fullName}</td>
            <td>${element.email}</td>
            <td><button class="ver-btn btn btn-primary mr-2" id="${element.id}">Verify</button></td>
    </tr>`
  });
  VerifyCustomer();
}
displayAllLandlords();

let logOut = () =>{
  localStorage.clear();
  window.location.href = "/index.html";
}














let VerifyCustomer = () =>{
  buttons = document.querySelectorAll(".ver-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      fetch(`https://localhost:7134/api/Customer/VerifyCustomer/${e.target.id}`, {
        method : "PUT",
       })
       .then((respose) => {
        return respose.json();
        })
        .then(function (value) {
            console.log(value);
            if(value.status == true)
            {
              location.reload();
            }
        })
        .catch((resp) => {
           
        })   
    })
  })
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


function setLandlordNae() {
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();