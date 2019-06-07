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
        pass: '*********'
    }
};

//saisravvyapavani@gmail.com

var devOpsInfo = [{
      clientName: "IberiaAirline",
      appName: "CabinCrewPassengerPlus",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"",
      type:"sonar",
      url1:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=IberiaAirline&appName=CabinCrewPassengerPlus&type=sonar",
      url2:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=IberiaAirline&appName=CabinCrewPassengerPlus&type=sonarbackend",
      url3:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=IberiaAirline&appName=CabinCrewPassengerPlus&type=unit",
      url4:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=IberiaAirline&appName=CabinCrewPassengerPlus&type=ui"

   },{
       clientName: "Lufthansa",
      appName: "Ramp",
       sender1:"dhaneswar.majhi@gmail.com",
      sender2:"",
      type:"sonar",
      url1:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=Ramp&type=sonar",
      url2:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=Ramp&type=sonarbackend",
      url3:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=Ramp&type=unit",
      url4:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=Ramp&type=ui"
   },{
       clientName: "Lufthansa",
      appName: "TurnAroundMonitor",
      sender1:"dhaneswar.majhi@gmail.com",
      sender2:"",
      type:"sonar",
      url1:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=TurnAroundMonitor&type=sonar",
      url2:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=TurnAroundMonitor&type=sonarbackend",
      url3:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=TurnAroundMonitor&type=unit",
      url4:"https://devopsdashboardv2.eu-gb.mybluemix.net/static/cgi-bin/call.py?clientName=Lufthansa&appName=TurnAroundMonitor&type=ui"
   }];

 main("skjdhs"); 


function main(params) {

var clientName = [];


devOpsInfo.forEach(function(key) {
  
  

 
     var options1 = {
      url: key.url1,
      json: true
      };
      var options2 = {
      url: key.url2,
      json: true
      };
      var options3 = {
      url: key.url3,
      json: true
      };
      var options4 = {
      url: key.url4,
      json: true
      };

 return new Promise(function (resolve, reject) {

      request(options1, function (err, resp1) {
             if (err) {
                console.log(err);
                 reject({err: err});
             }
            console.log("dasjkdbds "+ resp1.body.status)

            request(options2, function (err, resp2) {
             if (err) {
                console.log(err);
                 reject({err: err});
             }
            // responses = JSON.stringify(resp);
            // console.log("fdsjkfhdsf "+JSON.stringify(resp));
            console.log("dasjkdbds "+ resp2.body.status)

            request(options3, function (err, resp3) {
             if (err) {
                console.log(err);
                 reject({err: err});
             }
            console.log("dasjkdbds "+ resp3.body.pass_TC)
            request(options4, function (err, resp4) {
             if (err) {
                console.log(err);
                 reject({err: err});
             }
           
            console.log("dasjkdbds "+ resp4.body.pass_TC)

            let response = {
                      code: 200,
                      msg: 'E-mail was sent successfully!'
                  };

                   if (response.code != 200) {
                      reject(response);
                  }
                  console.log(`Validation was successful, preparing to send email...`);
              
                setTimeout(function() {

                //  if(typeof resp.body.blockers !== 'undefined' && typeof resp.body.criticalIssue !== 'undefined' && typeof resp.body.status !== 'undefined'){
                  //  if(resp.body.blockers > 0 || resp.body.criticalIssue > 0 || resp.body.status != 'Pass'){
                    sendEmail(key,resp1.body,resp2.body,resp3.body,resp4.body, function (email_response) {
                            response.msg = email_response['msg'];
                            response.code = email_response['code'];
                            response.reason = email_response['reason'];
                            console.log(`Email delivery response: (${email_response['code']}) ${response.msg}`);
                            resolve(response);
                        });
                  //}
                  //} 
                }, 5000);

          return  resp1;
    });
             });
            });
            });

    });

 });
    
}

function sendEmail(key,responses1,responses2,responses3,responses4, callback) {
var htmlReport = "";

if(responses1.blockers > 0 || responses1.criticalIssue > 0 || responses1.status !='Pass' ){
  
    htmlReport = htmlReport + '<!DOCTYPE html><html lang="en"><head><title>DevOps Dashboard</title><meta charset="utf-8">'
  +'<meta name="viewport" content="width=device-width, initial-scale=1">'
  +'<style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding: 5px;text-align: left;}</style></head><body>'
  +'<div class="container"><h2>Hi Team , </h2><h2>DevOps IOS Sonar report for : <b>'+key.clientName + " " +key.appName
  +' </b></h2><p>Issues are listed below on  date : <b>'+ responses1.date
  +' </b>  </p><table class="table"><thead><tr><th>Name</th><th>Data</th></tr>'
  +'</thead><tbody><tr><td>Blocker</td><td>'+ responses1.blockers+' </td></tr><tr class="success"><td> Critical</td><td>'+responses1.criticalIssue
  +' </td></tr><tr class="danger"><td>Status </td><td>'+responses1.status+' </td></tr></tbody></table></div></body></html>';
}

if(responses2.blockers > 0 || responses2.criticalIssue > 0 || responses2.status !='Pass' ){

 htmlReport = htmlReport + '<!DOCTYPE html><html lang="en"><head><title>DevOps Dashboard</title><meta charset="utf-8">'
+'<meta name="viewport" content="width=device-width, initial-scale=1">'
+'<style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding: 5px;text-align: left;}</style></head><body>'
+'<div class="container"><h2>DevOps Back-End Sonar report for : <b>'+key.clientName + " " +key.appName
+' </b></h2><p>Issues are listed below on  date : <b>'+ responses2.date
+' </b>  </p><table class="table"><thead><tr><th>Name</th><th>Data</th></tr>'
+'</thead><tbody><tr><td>Blocker</td><td>'+ responses2.blockers+' </td></tr><tr class="success"><td> Critical</td><td>'+responses2.criticalIssue
+' </td></tr><tr class="danger"><td>Status </td><td>'+responses2.status+' </td></tr></tbody></table></div></body></html>';

}

if(responses3.status < 100 || responses3.codecoverage < 60){

htmlReport = htmlReport +  '<!DOCTYPE html><html lang="en"><head><title>DevOps Dashboard</title><meta charset="utf-8">'
+'<meta name="viewport" content="width=device-width, initial-scale=1">'
+'<style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding: 5px;text-align: left;}</style></head><body>'
+'<div class="container"><h2>DevOps Frontend Unit Test (XCT) report for : <b>'+key.clientName + " " +key.appName
+' </b></h2><p>Issues are listed below on  date : <b>'+ responses3.time
+' </b>  </p><table class="table"><thead><tr><th>Name</th><th>Data</th></tr>'
+'</thead><tbody><tr><td>Passed (%) </td><td>'+ responses3.status+' </td></tr><tr><td>Passed Test Cases</td><td>'+ responses3.pass_TC+' </td></tr><tr class="success"><td> Code Coverage (%)</td><td>'+responses3.codecoverage
+' </td></tr><tr class="danger"><td>Total Test Cases </td><td>'+responses3.total_TC+' </td></tr></tbody></table></div></body></html>';

}

if(responses4.status == "Quality Gate Fail"){

htmlReport = htmlReport  + '<!DOCTYPE html><html lang="en"><head><title>DevOps Dashboard</title><meta charset="utf-8">'
+'<meta name="viewport" content="width=device-width, initial-scale=1">'
+'<style>table, th, td {border: 1px solid black;border-collapse: collapse;}th, td {padding: 5px;text-align: left;}</style></head><body>'
+'<div class="container"><h2>DevOps Frontend UI Automation XCUI report for : <b>'+key.clientName + " " +key.appName
+' </b></h2><p>Issues are listed below on  date : <b>'+ responses4.time
+' </b>  </p><table class="table"><thead><tr><th>Name</th><th>Data</th></tr>'
+'</thead><tbody><tr><td>Status</td><td>'+ responses4.status+' </td></tr><tr><td>Pass Test Cases</td><td>'+ responses4.pass_TC+' </td></tr><tr class="success"><td> Build Version</td><td>'+responses4.buildVersion
+' </td></tr><tr class="danger"><td>Total Test Cases </td><td>'+responses4.total_TC+' </td></tr></tbody></table></div></body></html>';

}
 
    let transporter = nodemailer.createTransport(smtpConfig);
    let senderMailID = smtpConfig.auth.user;
    let mailOptions = {
        from: senderMailID,
        to: key.sender1+','+key.sender2,
        subject: `DevOps Dasboard Daily updates report `,
        text: 'Hi Team , ',
        html:htmlReport
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