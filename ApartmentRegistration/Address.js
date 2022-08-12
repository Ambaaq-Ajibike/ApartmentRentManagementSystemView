let getCountry = document.querySelector("#country")
let getState = document.querySelector("#state")
let getCities = document.querySelector("#lga")


let fetchAddress = async () =>{
    let a = await fetch('https://countriesnow.space/api/v0.1/countries/states');
    let b = a.json();
    return b;
}


let displayState = async () => {
    // let state = ["Abia", "Adamawa", "AkwaIbom", "Anambra", "Oyo", "Ogun"];
    // state.forEach(r => {
    //                 getState.innerHTML += `<option value="${r}">${r}</option>`
    //             })
    let c = await fetchAddress();
    let d = c.data;
    console.log(d);
    d.forEach(x =>{
        if (x.name == "Nigeria") {
            x.states.forEach(r => {
                getState.innerHTML += `<option value="${r.name}">${r.name}</option>`
            })
        }
        
    })
}

displayState();
let fetchcities = async () =>{
    let a = await fetch("http://locationsng-api.herokuapp.com/api/v1/lgas");
    let b = a.json();
    return b;
}

let displayCities = async () => {
    // let state = ["Abia", "Adamawa", "AkwaIbom", "Anambra", "Oyo", "Ogun"];
    // state.forEach(r => {
    //                 getCities.innerHTML += `<option value="${r}">${r}</option>`
    //             })
    let c = await fetchcities();
    console.log(c);
        console.log(getState.value);
    c.forEach(x =>{
        if (`${x.state} State` == getState.value) {
            x.lgas.forEach(r => {
                getCities.innerHTML += `<option value="${r}">${r}</option>`
            })
        }
        
    })
}
