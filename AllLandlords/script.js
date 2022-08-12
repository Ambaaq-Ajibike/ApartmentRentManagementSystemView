console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchLandlords = async () => {
  let unLandlords = await fetch(`${BASEURL}Landlord/GetAllLAndlords`);
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
            <td><button class="my-btn1 btn btn-primary mr-2" id="${element.id}-${element.fullName}" >Apartments</button></td>
    </tr>`
  });
  redirect1();
}
const redirect1 = () => {
  buttons = document.querySelectorAll(".my-btn1");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/ApartmentsByLandlord/index.html?id=${e.target.id}`
    })
  })
}
displayAllLandlords();

let logOut = () =>{
  localStorage.clear();
  window.location.href = "/index.html";
}

function setLandlordNae() {
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();


let displayDate = () => {
  var d = new Date;
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  let getdate = document.querySelector("#date");
  getdate.textContent = `Today   :    ${day}/${month + 1}/${year}`
}

displayDate();