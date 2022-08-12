console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchApprovedApartments = async () => {
  let unApprovedApartments = await fetch(`${BASEURL}Apartment/GetApprovedApartments`);
  let jsonUnApprovedApartments = await unApprovedApartments.json();
  console.log(jsonUnApprovedApartments); 
  return jsonUnApprovedApartments;
}
let aparts = [];
let displayApprovedApartments = async () => {
    console.log("1");
    const response = await fetchApprovedApartments();
    let count = 0;
    // aparts = response.data;
    let tableData = document.querySelector("#table-data");
    aparts = response.data.map(element => {
        count ++;
    tableData.innerHTML += `<tr >
            <td>${element.apartmentNumber}</td class=${element.id}>
            <td><button class="my-btn btn btn-primary mr-2" id=${element.id}>Info</button></td>
    </tr>`
    return {address: `${element.addressDescription}, ${element.lga}, ${element.state}`,
      category: `${element.category}`, 
      };

  });
  redirect();
}
const redirect = () => {
  buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/ApprovedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}
displayApprovedApartments();

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

function setLandlordNae() {
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();
let getsearch = document.querySelector("#search");

// getsearch.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   aparts.forEach(apart => {
//     const isVisible = apart.address.toLowerCase().includes(value) || apart.category.toLowerCase().includes(value);
//     console.log(isVisible);
//     console.log(apart.className);
//     apart.className.toggle("hide", !isVisible);
//   })
// })

$(document).ready(function(){
  $("#search").keyup(function(){ 
      var filter = $(this).val(), count = 0;
      $("#table-data").each(function(){
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
              $(this).hide();
          } else {
              $(this).show();
              count++;
          }
      });
      
  });
});