let a = document.querySelector("#err-message");
// console.log("Welcome");

    let myForm = document.querySelector("#registration-form");
    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    let Submit = () =>{
       let sendForm = new FormData(myForm);
       console.log(sendForm);
        fetch('https://localhost:7134/api/Admin/RegisterAdmin',
        {
            method : 'POST',
            body : sendForm
            
        })
        .then((response) => {
            console.log("1");
            return response.json();
        })
        .then((value) => {
            console.log("2");
            console.log(value);

            if(value.status == true)
            {
                console.log("2");
                window.alert("Registration successful");
                window.location.href = "/Login/index.html";
            }
            else{
                console.log("3");
                window.alert(`${value.message}`); 
                window.location.reload();
            }
        })
        .catch((resp) => 
        {
            window.alert(`${resp.error}`); 
            window.location.reload();
            
        })

    }
 