
window.confirm("are u sure")
var BASEURL = "https://localhost:7134/api/"


let aparts = [];
let userCardTemplate = document.querySelector("[data-user-template]");
let userCardContainer = document.querySelector("[data-user-cards-container]");
let getsearch = document.querySelector("#search");
let utilityDiv = document.querySelector("[data-utility-div]");
  
  
fetch(`${BASEURL}Apartment/GetAllApartments`)
.then(res => res.json())
.then(data => {
  aparts = data.data.map(element => {


    const card = userCardTemplate.content.cloneNode(true).children[0]; 
    const address = card.querySelector("[data-address]");
    const price = card.querySelector("[data-price]");
    const image = card.querySelector("[data-image]");
    const info = card.querySelector(".apart-info");


    let splitAddress = element.address.split(",");
    address.textContent = `${splitAddress[splitAddress.length - 3]}, ${splitAddress[splitAddress.length - 2]}, ${splitAddress[splitAddress.length - 1]}`;
    price.textContent = `# ${element.price}`;
        image.innerHTML = `<img src="https://localhost:7134/Images/${element.images[0].name}" style="height: 25pc;" alt="" class="img-a img-fluid">`;
        info.innerHTML = `<p  style="cursor: pointer;" class="link-a info-Click" id=${element.id}>Click here to view
        <span class="ion-ios-arrow-forward"></span>
      </p>`;
    userCardContainer.append(card);
    return {address: element.address, price: element.price, element: card};
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
    const isVisible = apart.address.toLowerCase().includes(value);
    console.log(isVisible);
    apart.element.classList.toggle("hide", !isVisible);
  })
})

