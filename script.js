console.log("seen");
if (localStorage.getItem("CustomerId") != undefined) {
    let getchangeInnerText =  document.querySelector("#changeInnerHtml");
    getchangeInnerText.innerHTML = `<a class="nav-link" href="/CustomerDashBoard/index.html">DashBoard</a>`
}
else if (localStorage.getItem("newLandlordId") != undefined) {
    let getchangeInnerText =  document.querySelector("#changeInnerHtml");
    getchangeInnerText.innerHTML = `<a class="nav-link" href="/LandlordDashBoard/index.html">DashBoard</a>`
}
else if(localStorage.getItem("userId") != undefined)  {
    let getchangeInnerText =  document.querySelector("#changeInnerHtml");
    getchangeInnerText.innerHTML = `<a class="nav-link" href="/AdminDashBoard/index.html">DashBoard</a>`
}


console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchCategories = async () => {
  let unCategories = await fetch(`${BASEURL}Category/GetAllCategorys`);
  let jsonUnCategories = await unCategories.json();
  console.log(jsonUnCategories); 
  return jsonUnCategories;
} 
let displayAllCategories = async () => {
    console.log("1");
    let count = 0;
    const response = await fetchCategories();
    console.log(response.length)
    let tableData = document.querySelector("#table-data");
    response.data.forEach(element => {
        count++;
    tableData.innerHTML += `<tr>
            <td>${count}</td>
            <td>${element.name}</td>
            <td>${element.rate} x apartment amount</td>
    </tr>`

  });
}
displayAllCategories();