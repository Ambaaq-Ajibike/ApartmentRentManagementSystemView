function setLandlordNae() {
  let getName = document.querySelector(".name");
   getName.textContent = localStorage.getItem("LandlordName");
} 
setLandlordNae();

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
let getunAppr = document.querySelector("#unapproved")
let getunRented = document.querySelector("#unrented")
let getunVerified = document.querySelector("#unverified")
let getComplaint = document.querySelector("#complaint")

let fetchDashBoardInfo = async () => {
  let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Complaint/ShowDashBoard`);
  let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
  return jsonUnApprovedApartmentInfo;
}
let displayImage = async () => {
  let landlordInfo = await fetchDashBoardInfo();
  console.log(landlordInfo);
  getunAppr.textContent = landlordInfo.unApproveApartmentCount;
  getunRented.textContent = landlordInfo.unRentedApartmentCount;
  getunVerified.textContent = landlordInfo.unVerifiedCustomerCount;
  getComplaint.textContent = landlordInfo.unSolvedComplaintsCount;

  
}
displayImage();