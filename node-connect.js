const http = require('http');
const https = require('https');

const fs = require("fs");

http.createServer((request, response) => {
    const { headers, method, url } = request;
let body = [];
request.on('error', (err) => {
    console.error(err);
}).on('data', (chunk) => {
    body.push(chunk);
}).on('end', () => {
    body = Buffer.concat(body).toString();

response.on('error', (err) => {
    console.error(err);
});

response.statusCode = 200;
response.setHeader('Content-Type', 'application/json');
response.setHeader('User-Agent', 'PhilTest');

const responseBody = { headers, method, url, body };

response.write(JSON.stringify(responseBody));
fs.writeFileSync('textresponse-8089.txt', JSON.stringify(responseBody), () => {});

///* Debug code

varBodyObj = JSON.parse(body);
console.log(varBodyObj.messageId, varBodyObj.to);
console.log(responseBody);

//*/
    var extServerOptionsPost = {
        host: 'secure-rhh-ace-kieserver.bpsaz.ldcloud.com.au',
        //port: '3752',
        path: '/services/rest/server/containers/rhh-ace-tmp_1.0.0-SNAPSHOT/processes/instances/signal/' + varBodyObj.messageId,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cmhwYW1BZG1pbjpyaHBhbUFkbWluITIz'
        }
    };

    var reqPost = https.request(extServerOptionsPost, function (res) {
        console.log("response statusCode: ", res.statusCode);
        res.on('data', function (data) {
            console.log('Posting Result:\n');
            console.log('\n\nPOST Operation Completed');
        });
    });

// 7
    var payload = {"au.com.leonardo.poc.sms_test.SMSreply":body};
    reqPost.write(payload);
    reqPost.end();
    reqPost.on('error', function (e) {
        console.error(e);
    });

response.end();

});
}).listen(8089);