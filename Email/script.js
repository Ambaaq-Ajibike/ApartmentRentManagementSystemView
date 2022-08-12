// console.log("gfsvhgsggdhbvgsd")
// Data = {  
//     "sender":{  
//        "name":"Apartment Rent Management System",
//        "email":"ajibikeabdulqayyum04@gmail.com"
//     },
//     "to":[  
//        {  
//           "email":"ajibikeambaaq@gmail.com",
//           "name":"Ajibike Ambaaq"
//        }
//     ],
//     "subject":"c",
//     "htmlContent":"<html><head></head><body><p>Hello,</p>We provide a peaceful abode, for your satisfaction.</p></body></html>"
//  }
//         fetch('https://api.sendinblue.com/v3/smtp/email',
//         {
//             method : 'POST',
//             headers:{
//                 'accept': 'application/json',
//                 'api-key': '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',
//                 'content-type': 'application/json'
//             },
//             body : JSON.stringify(Data)
            
//         })
//         .then((response) => {
//             console.log("1");
//             return response.json();
//         })
//         .then((value) => {
//             console.log("2");
//             console.log(value);
//         })
//         .catch((resp) => 
//         {
//             console.log("hdryftgyhujetyh");
            
//         })














console.log("gfsvhgsggdhbvgsd")
Data = {  
    "firstname":"John",
    "lastname":"Doe",
    "dob":"31-05-2000"
 }
        fetch('https://vapi.verifyme.ng/v1/verifications/identities/nin/10000000001',
        {
            method : 'POST',
            headers:{
                'accept': 'application/json',
                'api-key': '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',
                'content-type': 'application/json'
            },
            body : JSON.stringify(Data)
            
        })
        .then((response) => {
            console.log("1");
            return response.json();
        })
        .then((value) => {
            console.log("2");
            console.log(value);
        })
        .catch((resp) => 
        {
            console.log("hdryftgyhujetyh");
            
        })