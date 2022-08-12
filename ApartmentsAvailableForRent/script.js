console.log(localStorage.getItem("CustomerId"));
if (localStorage.getItem("CustomerId") != undefined) {
  let getchangeInnerText = document.querySelector("#changeInnerHtml");
  getchangeInnerText.innerHTML = `<a class="nav-link" href="/CustomerDashBoard/index.html">DashBoard</a>`
  
  }

var BASEURL = "https://localhost:7134/api/"


let aparts = [];
let userCardTemplate = document.querySelector("[data-user-template]");
let userCardContainer = document.querySelector("[data-user-cards-container]");
let getsearch = document.querySelector("#search");
let utilityDiv = document.querySelector("[data-utility-div]");
  

fetch(`${BASEURL}Apartment/GetAllUnRentedApartments`)
.then(res => res.json())
.then(data => {
  console.log(data);
  aparts = data.data.map(element => {


    const card = userCardTemplate.content.cloneNode(true).children[0]; 
    const address = card.querySelector("[data-address]");
    const price = card.querySelector("[data-price]");
    const image = card.querySelector("[data-image]");
    const bed = card.querySelector("[data-bed]");
    const bath = card.querySelector("[data-bat]");
    const bedval = card.querySelector("[data-bed-val]");
    const bathval = card.querySelector("[data-bath-val]");
    const garval = card.querySelector("[data-g-val]");
    const garage = card.querySelector("[data-gar]");
    const info = card.querySelector(".apart-info");
    

    address.textContent = `${element.addressDescription}, ${element.lga}, ${element.state}`;
    price.textContent = `# ${element.price}`;
        bed.textContent = `${element.utilities[0].name}`
        bath.textContent = `${element.utilities[1].name}`
        garage.textContent = `${element.utilities[2].name}`
        bedval.textContent = `${element.utilities[0].quantity}`
        bathval.textContent = `${element.utilities[1].quantity}`
        garval.textContent = `${element.utilities[2].quantity}`
        image.innerHTML = `<img src="https://localhost:7134/Images/${element.images[0].name}" style="height: 25pc;" alt="" class="img-a img-fluid">`;
        info.innerHTML = `<p  style="cursor: pointer;"  class="link-a info-Click" id=${element.id}>Click here to view
        <span class="ion-ios-arrow-forward"></span>
      </p>`;
    userCardContainer.append(card);
    return {address: `${element.addressDescription}, ${element.lga}, ${element.state}`,
      price: `${element.price}`, 
      utility0: `${element.utilities[0].quantity} ${element.utilities[0].name}`,
      utility1: `${element.utilities[1].quantity} ${element.utilities[1].name}`,
      utility2: `${element.utilities[2].quantity} ${element.utilities[2].name} `,
      element: card};
  });
  redirect1();
})


const redirect1 = () => {
  buttons = document.querySelectorAll(".info-Click");
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.location.href = `/UnRentedApartmentInfo/index.html?id=${e.target.id}`
    })
  })
}


getsearch.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  aparts.forEach(apart => {
    const isVisible = apart.address.toLowerCase().includes(value) || apart.price.includes(value) || apart.utility0.toLowerCase().includes(value) || apart.utility1.toLowerCase().includes(value) || apart.utility2.toLowerCase().includes(value);
    console.log(isVisible);
    apart.element.classList.toggle("hide", !isVisible);
  })
})


let checkLogin = () =>{
  if (localStorage.getItem("CustomerId") == undefined) {
    console.log("not logged in");
    alert("You are required to login");
    
    // swal({
    //   title: "Success!",
    //   text: "You are required to login.",
    //   type: "success",
    //   timer: 5000000,
    //   showConfirmButton: true
    // });
    window.location.href = "/Login/index.html"
   
  }
}
// checkLogin();
