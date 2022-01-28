const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    console.log(firstName,lastName,email);
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/b260daa94fddd";

    const options = {
        method: "POST",
        auth: "apikey:66c44e149cc481f819f6ab67d85c46d4-us20"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200) {
            res.sendFile(__dirname+"/pages/success.html")
        }else {
            res.sendFile(__dirname+"/pages/failure.html")
        }
    })

    request.write(jsonData);

    request.end();

});

app.post("/failure",function(req,res) {
    res.redirect("/");
})


app.listen(3000,function(){
    console.log("Server started running.")
})


// 66c44e149cc481f819f6ab67d85c46d4-us20


// b260daa94f