// ==UserScript==
// @name         UCAM Extended
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Having Pera lying to your dad? Here it is!
// @author       NUNU
// @match        *://ucam.uiu.ac.bd/*
// @icon         https://www.google.com/s2/favicons?domain=ac.bd
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://cdn.jsdelivr.net/npm/table-to-json@1.0.0/lib/jquery.tabletojson.min.js
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    //Declare Datas
    var Aurna = [
        'http://localhost/UIUExamRoomFinder/aurna-lightbox.css',
        'http://localhost/UIUExamRoomFinder/aurna-lightbox.js'
    ];
    var metaData = [
        'https://facebook.com/tawsiftorabi',
        'https://github.com/TawsifTorabi/realtimeHTML',
        'UCAM Extended Plugin',
        'v0.1.1 Beta'
    ];




    /**************
    ***************
    NECESSARY FUNCTION AND CODES
    **************
    **************/

    //Check Where the User is right now.
    function PageChecker(name){

		var catchedURL = window.location.href;

		if(name == 'routine'){
            var mmiString = catchedURL.split('?')[0];
            //Check if the page is the routine page
            if(mmiString.split('/')[5] == "RptStudentClassRoutine.aspx"){
                alert('Routine Page!');
                console.log("Routine Page = True");
                return true;
            }else{
                return false;
            }
        }

        if(name == 'home'){
            //Check if the page is the home page
            if(catchedURL.split('/')[4].split('.')[0] == "StudentHome"){
                alert('Home Page!');
                console.log("Home Page = True");
                return true;
            }else{
                return false;
            }
        }

        if(name == null){
            return false;
        }
    }



    //Number Comma Separator
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //Number Comma Separator remover
    function numberWithoutCommas(x) {
        return parseFloat(x.replace(/,/g, ''));
    }




    ///////////////////////////
    ///////////////////////////
    //All Custom Functions/////
    ///////////////////////////
    ///////////////////////////

    var U1customFunctions = window.U1customFunctions = {};

	//Reset Plugin, Remove All Data Stored By This Plugin
	U1customFunctions.ResetPlugin = function(){
		localStorage.removeItem('AutoLoadClassRoutine');
	}





    //Setting1 Function
    //This Function Adds event listener to the Plugin Options
    //And sets value of the settings to the local storage

    ////////////////////////////
    //Setting1 function starts//
    ////////////////////////////

    U1customFunctions.Setting1 = function(){

        //Sets settings for the Routine Autoloader
        var AutoLoadRoutineSettingsInput = document.getElementsByName('AutoLoadRoutine');
        for(var j=0; AutoLoadRoutineSettingsInput.length>j; j++){
            if(AutoLoadRoutineSettingsInput[j].value == 'yes'){
                AutoLoadRoutineSettingsInput[j].addEventListener("click", function(){U1customFunctions.AutoLoadClassRoutine('set', true)});
                if(U1customFunctions.AutoLoadClassRoutine('get') == 'true'){
                    AutoLoadRoutineSettingsInput[j].setAttribute('checked', 'checked');
                }
            }
            if(AutoLoadRoutineSettingsInput[j].value == 'no'){
                AutoLoadRoutineSettingsInput[j].addEventListener("click", function(){U1customFunctions.AutoLoadClassRoutine('set', false)});
                if(U1customFunctions.AutoLoadClassRoutine('get') == 'false'){
                    AutoLoadRoutineSettingsInput[j].setAttribute('checked', 'checked');
                }
            }
        }


        //Sets settings for the Routine Button
		var RoutineBtnSettingsInput = document.getElementsByName('ShowRoutineBtn');
        for(var k=0; RoutineBtnSettingsInput.length>k; k++){
            if(RoutineBtnSettingsInput[k].value == 'yes'){
                RoutineBtnSettingsInput[k].addEventListener("click", function(){U1customFunctions.ShowRoutineBtn('set', true)});
                if(U1customFunctions.ShowRoutineBtn('get') == 'true'){
                    RoutineBtnSettingsInput[j].setAttribute('checked', 'checked');
                }
            }
            if(RoutineBtnSettingsInput[k].value == 'no'){
                RoutineBtnSettingsInput[k].addEventListener("click", function(){U1customFunctions.ShowRoutineBtn('set', false)});
                if(U1customFunctions.ShowRoutineBtn('get') == 'false'){
                    RoutineBtnSettingsInput[k].setAttribute('checked', 'checked');
                }
            }
        }

    };
    //////////////////////////
    //Setting1 function Ends//
    //////////////////////////







    //Use this function to let user set if the Class Routine of current Trimester will autometically load or not
    //opt parameter sets the opt value by user defined 'set' or 'get'.
    //'set' will set the boolean value and 'get' will return the value from the localStorage
    /////////////////////////////////////////
    //AutoLoadClassRoutine function Starts///
    /////////////////////////////////////////

    U1customFunctions.AutoLoadClassRoutine = function(opt, bool){
		if(opt == 'set' && bool == true){
			localStorage.setItem('AutoLoadClassRoutine', true);
            console.log('AutoLoadClassRoutine = true');
            return bool;
		}
		if(opt == 'set' && bool == false){
			localStorage.setItem('AutoLoadClassRoutine', false);
            console.log('AutoLoadClassRoutine = false');
            return bool;
		}
		if(opt == 'get' && bool == null){
			var RoutineLoadBool = localStorage.getItem('AutoLoadClassRoutine');
            return RoutineLoadBool;
            var logData = 'AutoLoadClassRoutine returned ->'+ RoutineLoadBool;
            console.log(logData);
		}
	}
    /////////////////////////////////////////
    //AutoLoadClassRoutine function Ends///
    /////////////////////////////////////////




    //////////////////////////////////////////////////////
    //Show Routine Button Toggle function Starts//////////
    //////////////////////////////////////////////////////
    //Use this function to let user set if the Class Routine Shortcut Button will show on homepage
    //opt parameter sets the opt value by user defined 'set' or 'get'.
    //'set' will set the boolean value and 'get' will return the value from the localStorage

	U1customFunctions.ShowRoutineBtn = function(opt, bool){
		if(opt == 'set' && bool == true){
			localStorage.setItem('ShowRoutineBtn', true);
            console.log('ShowRoutineBtn set as true');
            return bool;
		}
		if(opt == 'set' && bool == false){
			localStorage.setItem('ShowRoutineBtn', false);
            console.log('ShowRoutineBtn set as false');
            return bool;
		}
		if(opt == 'get' && bool == null){
			var RoutineBtnBool = localStorage.getItem('ShowRoutineBtn');
            return RoutineBtnBool;
            var logData = 'ShowRoutineBtn returned'+ RoutineBtnBool;
            console.log(logData);
		}
	}
    //////////////////////////////////////////////////////
    //Show Routine Button Toggle function Ends////////////
    //////////////////////////////////////////////////////




    /////////////////////////////////////////
    //GetTrimesterInfo function Starts///////
    /////////////////////////////////////////
    //Use this function to Get Batch Number, Trimester Name or Year
    //'get' will return the value from the localStorage

	U1customFunctions.GetTrimesterInfo = function(opt){
        var TrimLocal = localStorage.getItem('TrimesterInfo');
		if(opt == 'CurrentBatch'){
            var batch = TrimLocal.split(':')[0];
            console.log('GetTrimesterInfo returned Current Batch - ' + batch);
            return batch;
		}
		if(opt == 'CurrentTrimester'){
            var trimester = TrimLocal.split(':')[1];
            console.log('GetTrimesterInfo returned Current Trimester - ' + trimester);
            return trimester;
		}
		if(opt == 'CurrentYear'){
            var Year = TrimLocal.split(':')[2];
            console.log('GetTrimesterInfo returned Current Year - ' + Year);
            return Year;
		}
	}

    /////////////////////////////////////////
    //GetTrimesterInfo function Ends/////////
    /////////////////////////////////////////





    /////////////////////////////////////////
    //GetDepartment function Starts//////////
    /////////////////////////////////////////

	U1customFunctions.GetDept = function(idPrefix){
		if(idPrefix == '011'){
            return 'CSE';
		}
        if(idPrefix == '021'){
            return 'EEE';
		}
		if(idPrefix == '111'){
            return 'BBA';
		}
        if(idPrefix == '121'){
            return 'ECONOMICS';
		}
        if(idPrefix == '031'){
            return 'CIVIL';
		}

	}

    /////////////////////////////////////////
    //GetDepartment function Ends//////////
    /////////////////////////////////////////

    /**************
    ***************
    NECESSARY FUNCTION AND CODES ENDS
    **************
    **************/






    ////////////////////////////////////////////////
    //Starts Main Code/////////////
    ////////////////////////////////////////////////

    //Ektu Credits
    //http://localhost/UIUExamRoomFinder/appcode.js
    console.log(metaData[2] + ' ' + metaData[3] + ' - Written by @TawsifTorabi');
    console.log('Check on Github - ' + metaData[1]);


    //Add Elements to Body
    //Append Aurna Lightbox Scripts
    var link1 = document.createElement("link");
    var script1 = document.createElement("script");
    link1.href = Aurna[0];
    link1.type = "text/css";
    link1.rel = "stylesheet";
    script1.src = Aurna[1];
    document.body.appendChild(link1);
    document.body.appendChild(script1);



    //Necessary variable parsing


    var StudentId = document.getElementById('ctl00_lbtnUserName').innerHTML; //StudentID containing element from document
    var StudentIdNumArray = StudentId.toString().split('');
    var StudentIdBatchNum = StudentIdNumArray[0]+[1]+[2];

    var studentIDNullOP = (localStorage.getItem('studentIDVar') == null); //Check if student is captured
        //if Student Id is not stored in browser
        if(studentIDNullOP == true){
            console.log('*Student ID not found in localStorage');
            //Check if id containing element is available in the document
            if(typeof(StudentId) != 'undefined' && StudentId != null){
                console.log('Stored ID from doc - '+ StudentId);
                localStorage.setItem('studentIDVar', StudentId);
                console.log('*Student ID stored');
                console.log('Stored ID - '+localStorage.getItem('studentIDVar'));

                console.log('Batch Number - ' + StudentIdBatchNum);
                localStorage.setItem('studentBatchNumber', StudentIdBatchNum);

            } else{
                console.log('*Error finding Student ID Containing Element');
            }
        }

        //if Student Id is stored in browser
        if(studentIDNullOP == false){
            console.log('*Student ID found Stored previously');
            console.log('Stored ID - '+localStorage.getItem('studentIDVar'));

            //Check if id containing element is available in the document
            if(typeof(StudentId) != 'undefined' && StudentId != null){
                //Verify if the stored student id and webpage student id is identical
                if(localStorage.getItem('studentIDVar') == StudentId){
                    console.log('*Stored Student ID matched document Student ID');
                    var studentId = localStorage.getItem('studentIDVar');
                } else {
                    console.log('*Student ID did not match');
                    console.log('Stored ID - '+localStorage.getItem('studentIDVar'));
                    console.log('Document ID - '+ document.getElementById('ctl00_lbtnUserName').innerHTML);

                    StudentId = document.getElementById('ctl00_lbtnUserName').innerHTML;
                    localStorage.setItem('studentIDVar', StudentId);

                    console.log('*Student ID re-addressed');
                    console.log('Stored ID - '+localStorage.getItem('studentIDVar'));

                    console.log('Batch Number - ' + StudentIdBatchNum);
                    localStorage.setItem('studentBatchNumber', StudentIdBatchNum);
                }

            } else{
                console.log('*Error finding Student ID Containing Element');
            }
        }



    //Batch & Trimester Information Parsing
    var BatchIndicatorElement = document.getElementById('ctl00_lblCurrent');
    //Split Batch HTML Element to Current Batch, Running Trimester and Year
    var CurrentBatch = parseInt(BatchIndicatorElement.innerHTML.split(',')[1].split('-')[0]);
    var CurrentTrimester = BatchIndicatorElement.innerHTML.split(',')[1].split('-')[1].split(' ')[1];
    var CurrentYear = parseInt(BatchIndicatorElement.innerHTML.split(',')[1].split('-')[1].split(' ')[2]);

    var TrimesterInfoString = CurrentBatch +':'+ CurrentTrimester +':'+ CurrentYear;

    var TrimesterNullOP = (localStorage.getItem('TrimesterInfo') == null); //Check if batch info is captured

        //if Trimester Info is not stored in browser
        if(TrimesterNullOP == true){
            console.log('*Trimester Info not found in localStorage');
            //Check if id containing element is available in the document
            if(typeof(BatchIndicatorElement) != 'undefined' && BatchIndicatorElement != null){
                console.log('Trimester info from doc - ' + TrimesterInfoString);
                localStorage.setItem('TrimesterInfo', TrimesterInfoString);
                console.log('*Trimester info stored');
                console.log('Trimester info - '+localStorage.getItem('TrimesterInfo'));
            } else{
                console.log('*Error finding Trimester info Containing Element');
            }
        }

        //if Trimester Info is stored in browser
        if(TrimesterNullOP == false){
            console.log('*Trimester Info found Stored previously');
            console.log('Trimester Info - '+ localStorage.getItem('TrimesterInfo'));

            //Check if Trimester Info containing element is available in the document
            if(typeof(BatchIndicatorElement) != 'undefined' && BatchIndicatorElement != null){
                //Verify if the stored Trimester Info and webpage Trimester Info is identical
                if(localStorage.getItem('TrimesterInfo') == TrimesterInfoString){
                    console.log('*Stored Trimester Info matched document Trimester Info');
                } else {
                    console.log('*Trimester Info did not match');
                    console.log('Stored Info - '+localStorage.getItem('TrimesterInfo'));
                    console.log('Document Info - '+ TrimesterInfoString);

                    localStorage.setItem('TrimesterInfo', TrimesterInfoString);

                    console.log('*Trimester Info re-addressed');
                    console.log('Stored Trimester Info - '+localStorage.getItem('TrimesterInfo'));
                }

            } else{
                console.log('*Error finding Trimester Info Containing Element');
            }
        }





    //Run Script depending on pages
    //Check If the page is Homepage
    if(PageChecker('home') == true){

        var catchedURLfromAnchor = document.querySelectorAll('[role="menuitem"]')[2].lastChild.href;
        var mmiString = catchedURLfromAnchor.split('?')[1];
        var mmiCode,RoutineURL, scriptHalt;
        if(mmiString.split('=')[0] == "mmi"){
            mmiCode = mmiString.split('=')[1];
            RoutineURL = "https://ucam.uiu.ac.bd/Student/Report/RptStudentClassRoutine.aspx?mmi=" + mmiCode;
            scriptHalt = 'false';
        }else{
            console.log("Error Getting mmi Session ID");
            scriptHalt = 'true';
        }

        let Anchors = document.querySelectorAll('[role="menuitem"]');
        var AnchorsNum = Anchors.length;
        var SelectedAnchor, i;
        if(scriptHalt == 'false'){
            for(i=0; AnchorsNum>i; i++){
                if(Anchors[i].lastChild.innerHTML == "Registration"){
                    SelectedAnchor = Anchors[i];
                    const Clode = SelectedAnchor.cloneNode(true);
                    var NewAnchor1 = SelectedAnchor.parentElement.appendChild(Clode);
                    NewAnchor1.lastChild.innerHTML = "Class Routine";
                    NewAnchor1.lastChild.style.color = "red";
                    NewAnchor1.lastChild.href = RoutineURL;

                var NewHTML = "<h2>"+metaData[2]+" <small>"+metaData[3]+"</small></h2>";
                    NewHTML += "<h4>User Settings: </h4>";
                    NewHTML += "<table>";
                    NewHTML += "    <tr>";
                    NewHTML += "    <td style='padding:5px'>Automatic load Current Trimester Routine in the Class Routine Page: </td>";
                    NewHTML += "<td style='text-align: center; width: 180px;'><input type='radio' value='yes' name='AutoLoadRoutine'/> Yes  <input type='radio' name='AutoLoadRoutine' value='no'/> No </td>";
                    NewHTML += "</tr>";
                    NewHTML += "<tr>";
                    NewHTML += "    <td style='padding:5px'>Show Class Routine Button on the Homepage: </td>";
                    NewHTML += "<td style='text-align: center; width: 180px;'><input type='radio' name='ShowRoutineBtn' value='yes'/> Yes  <input type='radio' name='ShowRoutineBtn' value='no'/> No </td>";
                    NewHTML += "</tr>";
                    NewHTML += "<tr>";
                    NewHTML += "    <td style='padding:5px'>Student ID: </td>";
                    NewHTML += "<td style='text-align: center; width: 180px;'><input disabled id='StudentIdInputArea' value='"+ localStorage.getItem('studentIDVar') +"' type='text' maxlength='9'/></td>";
                    NewHTML += "</tr>";
                    NewHTML += "</table>";
                    NewHTML += "</br>";
                    NewHTML += "<center><a class='about-button' href='"+metaData[0]+"' target='_blank' style='padding: 5px 10px; text-decoration:none;'>Me on Facebook</a>&nbsp;&nbsp;";
                    NewHTML += "<a class='about-button' href='"+metaData[1]+"' target='_blank' style='padding: 5px 10px; text-decoration:none;'>Code On Github</a></br></br></center>";




                    var NewAnchor2 = NewAnchor1.parentElement.appendChild(NewAnchor1.cloneNode(true));
                    NewAnchor2.lastChild.innerHTML = "Plugin Settings";
                    NewAnchor2.lastChild.style.color = "green";
                    NewAnchor2.lastChild.style.fontWeight = "bold";
                    NewAnchor2.lastChild.href = 'javascript:void(0)';
                    NewAnchor2.lastChild.setAttribute('onclick', 'aurnaIframe("'+ NewHTML +'"); U1customFunctions.Setting1();');

                }
            }
        }else{
            console.log('Script Stopped, Can not find session id');
        }
    }



    if(PageChecker('routine') == true){
        console.log('Routine Page Loaded! Initialized...');

        var BatchSelector = document.getElementById('ctl00_MainContainer_ddlAcaCalBatch');

        if(U1customFunctions.AutoLoadClassRoutine('get') == 'true'){

            if(BatchSelector.selectedIndex !== 2){
                BatchSelector.selectedIndex = 2;
                document.getElementById("ctl00_MainContainer_Button1").click();
            }
            //if(BatchSelector.selectedIndex == 2){
             //   window.addEventListener('load', function() {

              //  });
            //}
        }

    }






})();
