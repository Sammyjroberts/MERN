/**
 * Created by deanroberts on 8/11/17.
 */
"use strict";

var DB_IDS = {
    proposalTableId : "bmqjj6guq",
    invoiceTableId : "bmqjj6gnw",
    changeOrderTableId : "bmqjj6gxx"
}
var FILE_NAME;
var urlParams = urlParamFactory();
//updated by Brett on 3/17/17
var JWT_CONST = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIiwidXNlcm5hbWUiOiJxYiIsImVtYWlsIjoicWJAcWIuY29tIiwiZmlyc3ROYW1lIjoicWIiLCJsYXN0TmFtZSI6InFiIiwicm9sZSI6ImJhc2ljIiwiZXhwIjoxNTEyMTc0NjY4LCJpYXQiOjE0ODA2Mzg2Njh9.K_W9qxrMvca8u7zU6blbDLFEiF4V9RMJlf-lLLiET9c";
var DOC_STR;
window.onload = function() {
    //routes
    var selectedRoute = buildRouteBasedOnDbid();
    console.log(selectedRoute);
    var finalRoute = selectedRoute + urlParams.recordID; // route for posting html
    var dbBaseURL = "https://localhost:3001/";
    //var nameRoute = dbBaseURL +selectedRoute + urlParams.documentId;
    var $emailBtn = $("#email-btn");
    //elements
    var $frame = $("#frame"); //iframe to load PDF
    var $pdfContainer = $("#pdfContainer"); //this is where we will place the pdf if requested
    var $downloadBtn = $("#dlbtn");
    var docTypeStr = "";

    if(urlParams.dbid == DB_IDS.invoiceTableId) {
        docTypeStr = "Invoice";
    }
    else if(urlParams.dbid == DB_IDS.proposalTableId) {
        docTypeStr = "Proposal";
    }
    else if(urlParams.dbid == DB_IDS.changeOrderTableId) {
        docTypeStr = "Change Order";
    }
    // FILE_NAME = response;
    // $("#fileNameHeader").text(FILE_NAME);
    // $emailBtn.click(function() {
    //     openEmailAndDownload();
    // })
    //NEEDS TO BE UPDATED EVERY YEAR
    //get HTML from backend
    $.get({
        url : dbBaseURL+finalRoute,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', JWT_CONST);
        },
        success : function(invoiceResponse) {
            DOC_STR = invoiceResponse.b64data;
            console.log("pdf case");
            $frame.attr("src", "data:application/pdf;base64,"+invoiceResponse.b64data); //load pdf into iframe
            $pdfContainer.css("display", "block"); //show container
            $("#loading").css("display", "none"); //cancel loading
            $downloadBtn.click(function() {
                var linkElem = document.createElement('a');

                linkElem.href = "data:application/octet-stream;base64," +invoiceResponse.b64data;

                console.log("inside promise")
                linkElem.download = FILE_NAME;
                document.body.appendChild(linkElem);

                //this allows a smoother page close animation and guarantees the user will see the file download animation go to the "Downloads" bar
                linkElem.click();
            });

            //hide useless html stuff
            $("#savebutton").css("display","none");
            $("#confirmbutton").css("display","none");
            $("#method-of-submittal").css("display","none");
            $(".alert").css("display","none");
            $(".modal").css("display","none");
            openEmailAndDownload();
        },
        error: showErr
    });
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * showErr function - will display a message in a p      *
 * Inputs:                                               *
 * response - HTTP response                              *
 * Processing:                                           *
 * $errorDiv - div to show error message.                *
 * $errorMsg - element to set message text               *
 * $loading - div to hide, saying loading has stopped    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function showErr(response) {
    console.log(response);
    var $errorDiv = $("#error");
    var $errorMsg = $("#errMsg");
    var $loading = $("#loading");
    $loading.css('display', 'none');
    $errorDiv.css('display', 'block');
    $errorMsg.text(response.responseJSON.message);
}


// put in a string and it will match the name to a parameter in URL and return it
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Removes scripts/links from html
function removeScripts(strCode){
    var html = $(strCode.bold());
    html.find('script').remove();
    html.find('link').remove();
    return html.html();
}
function buildRouteBasedOnDbid(){
    console.log(urlParams.dbid  + " == " + DB_IDS.invoiceTableId)
    var route = "";
    if(urlParams.dbid == DB_IDS.invoiceTableId) {
        route  = "api/qb/v2/invoicedocuments/preview/";
    }
    else if(urlParams.dbid == DB_IDS.proposalTableId) {
        route = "api/qb/v2/proposaldocuments/preview/";
    }
    else if(urlParams.dbid == DB_IDS.changeOrderTableId) {
        route = "api/qb/v2/changeorderdocuments/preview/";
    }
    return route;
}
function urlParamFactory() {
    var urlParams = {};
    urlParams.documentId = getParameterByName('documentId'); //id to request
    urlParams.typeToLoad = getParameterByName("typeToLoad"); //html or pdf
    urlParams.dbid = getParameterByName("dbid");
    urlParams.documentNumber = getParameterByName("documentNumber");
    urlParams.address = getParameterByName("propertyAddress");
    urlParams.companyName = getParameterByName("companyName");
    urlParams.propertyName = getParameterByName("propertyName");
    urlParams.revisionStr = getParameterByName("revisionNumber");
    urlParams.email = getParameterByName('email');
    urlParams.recordID = getParameterByName('recordID');
    console.log("Record ID: " + urlParams.recordID);
    return urlParams;
}
function openEmailAndDownload() {
    var downloadLink = document.createElement('a');

    downloadLink.href = "data:application/octet-stream;base64," + DOC_STR;

    downloadLink.download = (FILE_NAME + ".pdf");
    console.log(downloadLink.download);
    document.body.appendChild(downloadLink);
    var emailLink = document.createElement('a');
    var docTypeStr = "";
    if(urlParams.dbid == DB_IDS.invoiceTableId) {
        docTypeStr = "Invoice";
    }
    else if(urlParams.dbid == DB_IDS.proposalTableId) {
        docTypeStr = "Proposal";
    }
    else if(urlParams.dbid == DB_IDS.changeOrderTableId) {
        docTypeStr = "Change Order";
    }
    var emailBody = encodeURIComponent(
        "Hello:" + '\n\n'+
        "Please see attached " + docTypeStr + " #" +urlParams.documentNumber +
        "\nShould you have any questions please let us know.\n\n" +
        "Thank you for giving us the opportunity to serve you.");
    var emailSubject = encodeURIComponent(docTypeStr + " #"+ urlParams.documentNumber);
    emailLink.href = 'mailto:'+urlParams.email.trim()+'?subject='+emailSubject+'&body='+emailBody;
    console.log(emailLink);
    document.body.appendChild(emailLink);
    //this allows a smoother page close animation and guarantees the user will see the file download animation go to the "Downloads" bar


    //open email
    emailLink.click();
    //download invoice
    downloadLink.click();
    document.body.removeChild(emailLink);
    document.body.removeChild(downloadLink);
}
function getFileName(nameRoute) {
    return new Promise(function(resolve, reject) {
        $.get({
            url : nameRoute,
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization', JWT_CONST);
            },
            success : function(invoiceResponse) {
                console.log("name post done");
                console.log(invoiceResponse);
                resolve(invoiceResponse.fileName);
            },
            error: function(err) {
                console.log("name post err");
                reject(err);
            }
        });
    });
}