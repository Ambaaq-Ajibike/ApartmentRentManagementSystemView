var a = window.location.href.split('=')[1];
var b =  a.split("-");
// 1-SALAUDEEN%20ABDULHALEEM
var id = b[0];
var lname = b[1].split("%20")[1];
console.log(id);
let titleH = document.querySelector("#title");
titleH.textContent = `${lname} Apartments`


console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchApprovedApartments = async () => {
  let unApprovedApartments = await fetch(`${BASEURL}Landlord/GetApartmentsByLandlord/${id}`);
  let jsonUnApprovedApartments = await unApprovedApartments.json();
  console.log(jsonUnApprovedApartments); 
  return jsonUnApprovedApartments;
} 
let displayApartments = async () => {
    console.log("1");
    const response = await fetchApprovedApartments();
    console.log(response.length)
    let count = 0;
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count ++;
        if (element.isApproved == true) {
          
          tableData.innerHTML += `<tr>
                  <td>Apartment ${count}</td>
                  <td><button class="my-btn btn btn-primary mr-2" id=${element.id}>Info1</button></td>
          </tr>`
    }
    else if(element.isApproved == false)
    {
      tableData.innerHTML += `<tr>
                  <td>Apartment ${count}</td>
                  <td><button class="my-approvedbtn btn btn-primary mr-2" id=${element.id}>Info2</button></td>
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
  buttons = document.querySelectorAll(".my-approvedbtn");
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