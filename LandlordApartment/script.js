function setLandlordNae() {
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();

var id = localStorage.getItem("userId");

console.log(id);
var BASEURL = "https://localhost:7134/api/"
let fetchLandlordApartments = async () => {
  let LandlordApartments = await fetch(`${BASEURL}Landlord/GetApartmentsByUserId/${id}`);

  let jsonLandlordApartments = await LandlordApartments.json();
  console.log(jsonLandlordApartments); 
  return jsonLandlordApartments;
} 
let displayApartments = async () => {
    console.log("1");
    const response = await fetchLandlordApartments();
    console.log(response.data)
    let count = 0;
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count ++;
        if (element.isApproved == true) {
          
          tableData.innerHTML += `<tr>
                  <td>Apartment ${count}</td>
                  <td><button class="my-btn btn btn-primary mr-2" id=${element.id}>Info</button></td>
          </tr>`
    }
    else if(element.isApproved == false)
    {
      tableData.innerHTML += `<tr>
                  <td>Apartment ${count}</td>
                  <td><button class="my-Landlordbtn btn btn-primary mr-2" id=${element.id}>Info</button></td>
          </tr>`
    }

  });
  redirect1();
  redirect2();
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
  buttons = document.querySelectorAll(".my-Landlordbtn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/UnApprovedApartmentsInfo/index.html?id=${e.target.id}`
    })
  })
}
displayApartments();

let logOut = () =>{
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