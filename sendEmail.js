/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 var nodemailer = require('nodemailer');
 var request = require('request');

let smtpConfig = {
    host: 'smtp.gmail.com', // you can also use smtp.gmail.com
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'dhaneswar.majhi@gmail.com', 
        pass: '*************'
    }
};



var devOpsInfo = [{
      clientName: "IberiaAirline",
      appName: "CabinCrewPassengerPlus",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonar"

   },{
        clientName: "IberiaAirline",
      appName: "CabinCrewPassengerPlus",
       sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonarbackend"
   },{
       clientName: "Lufthansa",
      appName: "Ramp",
       sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonar"
   },{
       clientName: "Lufthansa",
      appName: "Ramp",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonarbackend"
   },{
       clientName: "Lufthansa",
      appName: "TurnAroundMonitor",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonar"
   },{
       clientName: "Lufthansa",
      appName: "TurnAroundMonitor",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"saisravvyapavani@gmail.com",
      type:"sonarbackend"
   }];

 main("skjdhs"); 


function main(params) {
let urlclienrName = "https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=";
let urlAppName = "&appName=";
let urlType = "&type=";



devOpsInfo.forEach(function(key) {
  
  var responses = "";

  console.log("test  "+urlclienrName+key.clientName+urlAppName+key.appName+urlType+key.type);
     var options = {
      url: urlclienrName+key.clientName+urlAppName+key.appName+urlType+key.type,
      json: true
   };

 return new Promise(function (resolve, reject) {

      request(options, function (err, resp) {
             if (err) {
                console.log(err);
                 reject({err: err});
             }
            // responses = JSON.stringify(resp);
            // console.log("fdsjkfhdsf "+JSON.stringify(resp));
            console.log("dasjkdbds "+ resp.body.status)
          let response = {
                      code: 200,
                      msg: 'E-mail was sent successfully!'
                  };

                  if (response.code != 200) {
                      reject(response);
                  }
                   console.log(`Validation was successful, preparing to send email...`);
                setTimeout(function() {

                 // console.log("ksdjhdsf "+responses.body);


                       sendEmail(key,resp.body, function (email_response) {
                            response.msg = email_response['msg'];
                            response.code = email_response['code'];
                            response.reason = email_response['reason'];
                            console.log(`Email delivery response: (${email_response['code']}) ${response.msg}`);
                            resolve(response);
                        });
                }, 3000);

          return  resp;
    });

    });

 });
    
}

function sendEmail(key,responses, callback) {

    let transporter = nodemailer.createTransport(smtpConfig);
    let senderMailID = smtpConfig.auth.user;
    let mailOptions = {
        from: senderMailID,
        to: key.sender1+','+key.sender2,//params.email,
        subject: `DevOps Dasboard Daily updates `,
        text: `Do it! `+ responses.status
    };
    transporter.sendMail(mailOptions, function (error, info) {

        let email_response = {
            code: 200,
            msg: 'Email was sent successfully',
            reason: 'Success'
        };

        if (error) {
            email_response.msg = 'Error';
            email_response.code = 500;
            email_response.reason = error;
        }
        else {
            email_response.msg = info.response;
            email_response.code = 200;
            email_response.reason = info.response;
        }
        callback(email_response);
    });
}
