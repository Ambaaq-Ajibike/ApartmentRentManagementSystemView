// function setLandlordNae() {
  
// } 
// setLandlordNae();

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



let fetchLandlordInfo = async (landlordId) => {
  let fetchUnApprovedApartmentInfo = await fetch(`https://localhost:7134/api/Landlord/GetLandLordInfo/${landlordId}`);
  let jsonUnApprovedApartmentInfo = fetchUnApprovedApartmentInfo.json();
  return jsonUnApprovedApartmentInfo;
}
let displayImage = async () => {
  let landlordInfo = await fetchLandlordInfo(localStorage.getItem("userId"));
  let getName = document.querySelector(".name");
  console.log(landlordInfo.data);
  let a = landlordInfo.data;
  // console.log(a.image);
  getName.textContent = a.fullName;
  
  let getimg = document.querySelector("#info")
  console.log(a.image);
  if (a.image == "" || a.image == null || a.image == undefined) {
    getimg.innerHTML += ` <img src="/MyImg/Annotation 2022-08-02 165618.jpg" alt="">`
  }
  else{
    getimg.innerHTML += `<img src="https://localhost:7134/Images/${a.image}" alt="profile"/>`
  }
}
displayImage();