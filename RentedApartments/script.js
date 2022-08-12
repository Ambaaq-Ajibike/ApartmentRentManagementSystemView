console.log("Welcome");



let logOut = () =>{
  localStorage.clear();
  window.location.href = "/index.html";
}

var BASEURL = "https://localhost:7134/api/"
let fetchApprovedApartments = async () => {
  let unApprovedApartments = await fetch(`${BASEURL}Apartment/GetAllRentedApartments`);
  let jsonUnApprovedApartments = await unApprovedApartments.json();
  console.log(jsonUnApprovedApartments); 
  return jsonUnApprovedApartments;
} 
let displayApprovedApartments = async () => {
    console.log("1");
    const response = await fetchApprovedApartments();
    console.log(response.length)
    let count = 0;
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count ++;
    tableData.innerHTML += `<tr>
            <td>${element.apartmentNumber}</td>
            <td><button class="my-btn btn btn-primary mr-2" id=${element.id}>Info</button></td>
    </tr>`

  });
  redirect();
}
const redirect = () => {
  buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/RentedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}
displayApprovedApartments();


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
  console.log("m bgb hdj dn g hd")
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();