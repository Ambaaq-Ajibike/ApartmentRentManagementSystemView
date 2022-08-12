var id = window.location.href.split('=')[1];
// console.log(window.location.href);

console.log("Welcome");
var BASEURL = "https://localhost:7134/api/"
let fetchApprovedApartments = async () => {
  let unApprovedApartments = await fetch(`${BASEURL}Complaint/GetAllUnSolvedComplaints`);
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
      tableData.innerHTML += `<tr>
                  <td>${count}</td>
                  <td>${element.problemDescription}</td>
                  <td><button class="my-btn btn btn-primary mr-2" id=${element.apartmentNumber}>Info</button></td>
                  <td><button class="my-approvedbtn btn btn-primary mr-2" id=${element.complaintId}>Solve</button></td>
          </tr>`

  });
  redirect();
  pay();
}

const redirect = () => {
  buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/ApprovedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}

displayApartments()
const pay = () => {
  buttons = document.querySelectorAll(".my-approvedbtn");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {

        fetch(`https://localhost:7134/api/Complaint/SolveComplaint/${e.target.id}`, {
            method : "Put",
            headers : {
              "Content-Type": "application/json"
          },
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
                    else
                    {
                        window.alert(value.message);
                    }
                    
            })
            .catch((resp) => {
                console.log(resp.error);
            })   
    })
  })
}