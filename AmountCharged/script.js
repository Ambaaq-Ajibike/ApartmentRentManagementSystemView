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