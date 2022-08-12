// ==UserScript==
// @name         UCAM Extended
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  A Web Plugin for UIU UCAM Portal to add more functionalities.
// @author       Tawsif Torabi
// @match        *://ucam.uiu.ac.bd/*
// @icon         https://www.google.com/s2/favicons?domain=ac.bd
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Declare Datas
    var Aurna = [
        'https://tawsiftorabi.github.io/ucamextended/src/aurna-lightbox_v0.1.css',
        'https://tawsiftorabi.github.io/ucamextended/src/aurna-lightbox_v0.1.js'
    ];

    var metaData = [
        'https://facebook.com/tawsiftorabi',
        'https://github.com/TawsifTorabi/UCAMextended',
        'UCAM Extended Plugin',
        'v0.1.3 Beta',
        'Tawsif Torabi',
        'http://tawsiftorabi.github.io'
    ];

    var otherLinks = [
        'https://tawsiftorabi.github.io/ucamextended/src/plugin_v0.1.css'
    ];

    var Jsonfiles = [
        'https://raw.githubusercontent.com/TawsifTorabi/UCAMextended/main/json/settings.json',
        'https://raw.githubusercontent.com/TawsifTorabi/UCAMextended/main/json/routine_EEE_CSE.json',
        'https://raw.githubusercontent.com/TawsifTorabi/UCAMextended/main/json/routine_BBA.json'
    ];






    /**************
    ***************
    NECESSARY FUNCTION AND CODES
    **************
    **************/


    ///////////////////////////
    ///////////////////////////
    //All Custom Functions/////
    ///////////////////////////
    ///////////////////////////


    String.prototype.isMatch = function(s){
	   return this.match(s)!==null
	}


    var U1customFunctions = window.U1customFunctions = {};

    //Check Where the User is right now.
    U1customFunctions.PageChecker = function(name){

		var catchedURL = window.location.href;

		if(name == 'routine'){
            var mmiString = catchedURL.split('?')[0];
            //Check if the page is the routine page
            if(mmiString.split('/')[5] == "RptStudentClassRoutine.aspx"){
                console.log("Routine Page = True");
                return true;
            }else{
                return false;
            }
        }

		if(name == 'login'){
            //Check if the page is the login page
            if(catchedURL.split('/')[4] == "Login.aspx"){
                console.log("Login Page = True");
                return true;
            }else{
                return false;
            }
        }

        if(name == 'home'){
            //Check if the page is the home page
            if(catchedURL.split('/')[4].split('.')[0] == "StudentHome"){
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





	//Reset Plugin, Remove All Data Stored By This Plugin
	U1customFunctions.ResetPlugin = function(){
		localStorage.removeItem('AutoLoadClassRoutine');
	}






    //Set the homepage routine style
	U1customFunctions.SetTitleHomePageRoutine = function(bool){
		if(bool == true){
            var RoutineRowsElementX = document.getElementsByClassName('hoverable');
            for(i=0; i< RoutineRowsElementX.length; i++){
                var g = RoutineRowsElementX[i].childNodes[1];							//Course Codes
                var f = RoutineRowsElementX[i].childNodes[2];							//Times Schedule
                var h = RoutineRowsElementX[i].title;									//Course Name

                g.innerHTML = "<span style='font-size: 11px;'>" + g.innerHTML + " " + h.replace('Laboratory','Lab') + "</span>";
                f.innerHTML = "<span style='font-size: 11px;color: #2a9fa5;'>" + f.innerHTML + "</span>";
            }
        }

        if(bool == false){
            RoutineRowsElementX = document.getElementsByClassName('hoverable');
            for(i=0; i< RoutineRowsElementX.length; i++){
                g = RoutineRowsElementX[i].childNodes[1];								//Course Codes
                var g2 = RoutineRowsElementX[i].childNodes[1].childNodes[0];			//New Course Codes

                f = RoutineRowsElementX[i].childNodes[2];								//Times Schedule
                var f2 = RoutineRowsElementX[i].childNodes[2].childNodes[0];			//New Times Schedule

                h = RoutineRowsElementX[i].title.replace('Laboratory','Lab');			//Course Name


                var CourseCodeString = g2.innerHTML.replace(h, "").trim();
                var timeString = f2.textContent;

                g.innerHTML = CourseCodeString;
                f.innerHTML = timeString;
            }
        }
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
        var RoutineBtnElement = document.getElementById('classRoutineExt');

        for(var k=0; RoutineBtnSettingsInput.length>k; k++){
            if(RoutineBtnSettingsInput[k].value == 'yes'){
                RoutineBtnSettingsInput[k].addEventListener("click", function(){
                    U1customFunctions.ShowRoutineBtn('set', true);
                    RoutineBtnElement.style.display = 'inherit';
                });
                if(U1customFunctions.ShowRoutineBtn('get') == 'true'){
                    RoutineBtnSettingsInput[k].setAttribute('checked', 'checked');
                }
            }
            if(RoutineBtnSettingsInput[k].value == 'no'){
                RoutineBtnSettingsInput[k].addEventListener("click", function(){
                    U1customFunctions.ShowRoutineBtn('set', false);
                    RoutineBtnElement.style.display = 'none';
                });
                if(U1customFunctions.ShowRoutineBtn('get') == 'false'){
                    RoutineBtnSettingsInput[k].setAttribute('checked', 'checked');
                }
            }
        }



       //Sets settings for the Plugin Top Bar
		var PluginBtnSettingsInput = document.getElementsByName('fixpluginbtn');
        var PluginBtnElement = document.getElementById('floating_box');

        for(k=0; PluginBtnSettingsInput.length>k; k++){

            if(PluginBtnSettingsInput[k].value == 'yes'){
                PluginBtnSettingsInput[k].addEventListener("click", function(){
                    U1customFunctions.SetPluginBtn('set', true);
                    PluginBtnElement.style.position = 'fixed';
                });

                if(U1customFunctions.SetPluginBtn('get') == 'true'){
                    PluginBtnSettingsInput[k].setAttribute('checked', 'checked');
                }
            }

            if(PluginBtnSettingsInput[k].value == 'no'){
                PluginBtnSettingsInput[k].addEventListener("click", function(){
                    U1customFunctions.SetPluginBtn('set', false);
                    PluginBtnElement.style.position = 'absolute';
                });

                if(U1customFunctions.SetPluginBtn('get') == 'false'){
                    PluginBtnSettingsInput[k].setAttribute('checked', 'checked');
                }
            }

        }




        //Sets settings for the Homepage add course title to routine
		var AddCourseTitleRoutineSettingsInput = document.getElementsByName('AddCourseTitleRoutine');

        for(k=0; AddCourseTitleRoutineSettingsInput.length>k; k++){
            if(AddCourseTitleRoutineSettingsInput[k].value == 'yes'){
                AddCourseTitleRoutineSettingsInput[k].addEventListener("click", function(){
                    if(U1customFunctions.ShowHomeCourseTitleRoutine('get') !== 'true'){
                        U1customFunctions.ShowHomeCourseTitleRoutine('set', true);
                        U1customFunctions.SetTitleHomePageRoutine(true);
                    }else{
                        //Do Nothing
                    }
                });
                if(U1customFunctions.ShowHomeCourseTitleRoutine('get') == 'true'){
                    AddCourseTitleRoutineSettingsInput[k].setAttribute('checked', 'checked');
                }
            }
            if(AddCourseTitleRoutineSettingsInput[k].value == 'no'){
                AddCourseTitleRoutineSettingsInput[k].addEventListener("click", function(){
                    if(U1customFunctions.ShowHomeCourseTitleRoutine('get') !== 'false'){
                        U1customFunctions.ShowHomeCourseTitleRoutine('set', false);
                        U1customFunctions.SetTitleHomePageRoutine(false);
                    }else{
                        //Do Nothing
                    }
                });
                if(U1customFunctions.ShowHomeCourseTitleRoutine('get') == 'false'){
                    AddCourseTitleRoutineSettingsInput[k].setAttribute('checked', 'checked');
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

	U1customFunctions.ShowHomeCourseTitleRoutine = function(opt, bool){
		if(opt == 'set' && bool == true){
			localStorage.setItem('AddCourseNameRoutineHomepage', true);
            console.log('AddCourseNameRoutineHomepage = true');
            return bool;
		}
		if(opt == 'set' && bool == false){
			localStorage.setItem('AddCourseNameRoutineHomepage', false);
            console.log('AddCourseNameRoutineHomepage = false');
            return bool;
		}
		if(opt == 'get' && bool == null){
			var CourseTitleBtnBool = localStorage.getItem('AddCourseNameRoutineHomepage');
            console.log('AddCourseNameRoutineHomepage returned'+ CourseTitleBtnBool);
            return CourseTitleBtnBool;
		}
	}
    //////////////////////////////////////////////////////
    //Show Routine Button Toggle function Ends////////////
    //////////////////////////////////////////////////////



    //////////////////////////////////////////////////////
    //Fresher Message function Starts////////////
    //////////////////////////////////////////////////////

    U1customFunctions.FresherMsg = function(){
        document.addEventListener('readystatechange', event => {
            if (event.target.readyState === "complete") {

                if(localStorage.getItem('studentDeptCode') == 'CSE'){
                    var uiucsecontents = 'If you are a CSE Student, or you got friends in CSE, </br>'+
                        'You can visit this webapp to search for CSE notes, books, class recordings, assignments and other contents </br>👉'+
                        '<i><b><a target=\'_blank\'href=\'https://tawsiftorabi.github.io/uiucse/\'>UIU CSE CONTENTS</a></b></i>'+
                        '</br>'+
                        'A lot of people worked for this project to help students out, so a big shout out to all the people. 💖</br>';
                }else{
                    uiucsecontents = '';
                }



                var tt = '<h2>Hello Bondhu!</h2>'+
                    '<p style=\'font-size: 14px;\'>Your Student ID tells that you are a fresher. We all were. </br>Even I was called fresher for 2 years due to Corona Pandemic. 😂‚</br>'+
                    'Don\'t worry, it doesn\'t mean anything, show love and respect to everyone. ✌ </br>'+
                    'And If you need any help with study or anything, we all are here to help. 💖</br>'+
                    '🎉Welcome to UIU 🎉'+
                    '</br>'+
                    '</br>'+
                    uiucsecontents+
                    'Peace, Over and Out 🕶</br>'+
                    '</p></br>'+
                    '<span style=\'font-size: 15px;\'><input id=\'HideFresherMsg\' type=\'checkbox\'> Don\'t show this Message Again</br></span>'+
                    '<a target=\'_blank\'href=\'https://tawsiftorabi.github.io/ucamextended/#bug\'>REPORT A BUG</a>';


                aurnaIframe(tt);

                document.getElementById('HideFresherMsg').addEventListener("click", function(){
                    if(localStorage.getItem('FresherMsg') == 'false'){
                        localStorage.setItem('FresherMsg', true);
                        document.getElementById('HideFresherMsg').setAttribute('checked', 'checked');
                    }else if(localStorage.getItem('FresherMsg') == 'true'){
                        localStorage.setItem('FresherMsg', false);
                        document.getElementById('HideFresherMsg').setAttribute('checked', 'unchecked');
                    }

                });
            }
        });
    }

    U1customFunctions.FresherMsgInit = function(){

        var stuid= localStorage.getItem('studentIDVar');

        var StudentBatchNum = stuid.split('')[3] + stuid.split('')[4] + stuid.split('')[5];
        //var StudentBatchNum = '221';

        var BatchCode = localStorage.getItem('TrimesterInfo').split(':')[0];

        if(StudentBatchNum == BatchCode){
            if(localStorage.getItem('FresherMsg') == null){
                localStorage.setItem('FresherMsg', true);
            }
            if(localStorage.getItem('FresherMsg') == 'true'){
                U1customFunctions.FresherMsg();
            }
        }
    }


    //////////////////////////////////////////////////////
    //Fresher Message function Ends////////////
    //////////////////////////////////////////////////////




    //////////////////////////////////////////////////////
    //Show Routine Button Toggle function Starts//////////
    //////////////////////////////////////////////////////
    //Use this function to let user set if the Class Routine Shortcut Button will show on homepage
    //opt parameter sets the opt value by user defined 'set' or 'get'.
    //'set' will set the boolean value and 'get' will return the value from the localStorage

	U1customFunctions.ShowRoutineBtn = function(opt, bool){
		if(opt == 'set' && bool == true){
			localStorage.setItem('ShowRoutineBtn', true);
            console.log('ShowRoutineBtn = true');
            return bool;
		}
		if(opt == 'set' && bool == false){
			localStorage.setItem('ShowRoutineBtn', false);
            console.log('ShowRoutineBtn = false');
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




    //////////////////////////////////////////////////////
    //Set Plugin Button Fixed or Absolute Toggle  function Starts//////////
    //////////////////////////////////////////////////////
    //Use this function to let user set if the Class Routine Shortcut Button will show on homepage
    //opt parameter sets the opt value by user defined 'set' or 'get'.
    //'set' will set the boolean value and 'get' will return the value from the localStorage

	U1customFunctions.SetPluginBtn = function(opt, bool){
		if(opt == 'set' && bool == true){
			localStorage.setItem('SetPluginBtnFixed', true);
            console.log('SetPluginBtnFixed = true');
            return bool;
		}
		if(opt == 'set' && bool == false){
			localStorage.setItem('SetPluginBtnFixed', false);
            console.log('SetPluginBtnFixed = false');
            return bool;
		}
		if(opt == 'get' && bool == null){
			var RBool = localStorage.getItem('SetPluginBtnFixed');
            return RBool;
            var logData = 'SetPluginBtnFixed returned'+ RBool;
            console.log(logData);
		}
	}
    //////////////////////////////////////////////////////
    //Set Plugin Button Fixed or Absolute Toggle function Ends////////////
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
		}else if(idPrefix == '021'){
            return 'EEE';
		}else if(idPrefix == '111'){
            return 'BBA';
		}else if(idPrefix == '121'){
            return 'ECONOMICS';
		}else if(idPrefix == '031'){
            return 'CIVIL';
		} else {
            return 'Wrong Dept. Code';
        }

	}

    /////////////////////////////////////////
    //GetDepartment function Ends//////////
    /////////////////////////////////////////




    ////////////////////////////////////////////////////
    //Get Department & Batch Code function Starts//////////
    ///////////////////////////////////////////////////

    U1customFunctions.GetStudentDeptCode = function(stuId){
        var studSplit = stuId.toString().split('');
        var StudentIdDeptCode = studSplit[0]+studSplit[1]+studSplit[2];
        return U1customFunctions.GetDept(StudentIdDeptCode);
    };

        U1customFunctions.GetStudentBatchCode = function(stuId){
        var studSplit = stuId.toString().split('');
        var StudentIdDeptCode = studSplit[3]+studSplit[4]+studSplit[5];
        return StudentIdDeptCode;
    };

    ///////////////////////////////////////////////
    //Get Department & Batch Code function Ends//////////
    ///////////////////////////////////////////////






    ///////////////////////////////////////////////
    //Show Exam Routine function Starts//////////
    ///////////////////////////////////////////////

	U1customFunctions.ShowExamRoutine = function(arr){

		var CourseArr = localStorage.getItem('CurrentCoursesArray').split(',');
		var StudentID = localStorage.getItem('studentIDVar');

		var out = "";
		var i, j;

        var GlobalData1 = JSON.parse(localStorage.getItem('GlobalSettings'));

        if(GlobalData1.general[0].currentExam == 'midterm'){
            var examTermName = 'Mid Term';
        }else if(GlobalData1.general[0].currentExam == 'final'){
            examTermName = 'Final';
        }

        var examTrimester = GlobalData1.general[0].examTrimester.split(':')[1] + " " + GlobalData1.general[0].examTrimester.split(':')[2];
        var deptCode = localStorage.getItem('studentDeptCode');



		console.log('Courses  Count - > ' + CourseArr.length);

		out += 	"<style>td, th {padding: 4px;}</style>"+
                "<h3>"+ examTermName+ " Exam Routine </h3>"+
                "<h4>"+ deptCode +", "+ examTrimester +"</h4>"+
                "<table width='95%' border style='font-size: 11px;font-family: unset;'>" +
				"<tr>"+
				"<th class='rtTh'>Dept.</th>"+
				"<th class='rtTh'>Course Name</th>"+
				"<th class='rtTh'>Teacher/Section</th>"+
				"<th class='rtTh'>Date</th>"+
				"<th class='rtTh'>Time</th>"+
				"<th class='rtTh'>Room No.</th>";

		for(j = 0; j < CourseArr.length; j++){ 				//Iterate for Course Array Length , 4 Times for this

			console.log('Json Count - > ' + arr.length);

			var UserCourseCode = CourseArr[j].split(' ')[0] +' '+ CourseArr[j].split(' ')[1];
			var UserSection = CourseArr[j].split(' ')[2].split('')[1];

			console.log('>> Current Course/Section: ' + UserCourseCode + ' / ' + UserSection);



			for(i = 0; i < arr.length; i++){				//Iterate for total json file, 216 times for this

				//Print Iteration Number
				//console.log(i);

				if(arr[i].CourseCode.isMatch(UserCourseCode) == true && arr[i].Section.isMatch(UserSection) == true){
					console.log(i);
					console.log("User Course Code Matched -> " + UserCourseCode);
					console.log("JSON Course Code -> "+ arr[i].CourseCode);
					console.log('Section -> ' + arr[i].Section);
					console.log("**********Course Section Matched -> " + UserSection);

					var roomString = arr[i].Room.replace(/\s+/g,' ').trim(); // Removes Extra Spaces
					var newRoomString1 = roomString.split(' ')[0] + ' ' + roomString.split(' ')[1];

                    if((roomString.split(' ')[2] == null) == true){
                        var newRoomString2 = '';
                    }else{
                        newRoomString2 = '</br>' + roomString.split(' ')[2] + ' ' + roomString.split(' ')[3];
                    }

					out += 	"<tr>"+
							"<td align='center'>" + arr[i].Dept + " </td>"+
							"<td align='center'>" + " (" + arr[i].CourseCode + ") " + arr[i].CourseTitle + " </td>"+
							"<td align='center'> " + arr[i].Teacher + " (" + arr[i].Section + ")" + " </td>"+
							"<td align='center'> "+ arr[i].ExamDate +" </td>"+
							"<td align='center'> "+ arr[i].ExamTime +"</td>"+
                            "<td align='center'> "+ newRoomString1 + newRoomString2 +"</td>"+
							"</tr>";
				}
			}

		}
		out += "</table>";

		return out;
	}
    ///////////////////////////////////////////////
    //Show Exam Routine function Ends//////////
    ///////////////////////////////////////////////





    ///////////////////////////////////////////////
    //Set Settings function Starts//////////
    ///////////////////////////////////////////////

	U1customFunctions.SetSettings = function(arr){
        //arr is already JSON Parsed
        if(localStorage.getItem('GlobalSettings') !== JSON.stringify(arr)){
            localStorage.setItem('GlobalSettings', JSON.stringify(arr));
            console.log('Global Setting Mismatched, Refreshed');
        }

    };


    ///////////////////////////////////////////////
    //Set Settings function Ends//////////
    ///////////////////////////////////////////////





    ///////////////////////////////////////////////
    //Appened Floatbox function Starts/////////////
    ///////////////////////////////////////////////

    U1customFunctions.AppendFloatbox = function(){
        //Appened Floatbox
        var floatboxHTML = document.createElement("div");
        floatboxHTML.id = "floating_box";

        var NewHTML3 = '';
        var xmlhttpRoutine = new XMLHttpRequest();

        if(localStorage.getItem('studentDeptCode') == 'CSE'){
            var url = Jsonfiles[1];
        }else if(localStorage.getItem('studentDeptCode') == 'BBA'){
            url = Jsonfiles[2];
        }


        xmlhttpRoutine.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                console.log('Routine JSON Request OK');
                var nArr = JSON.parse(this.responseText);
                console.log(nArr);
                var NewHTML3 = U1customFunctions.ShowExamRoutine(nArr);
                var examRtnBtn1 = document.getElementById('examRoutineBtn');
                if(typeof(examRtnBtn1) != 'undefined' && examRtnBtn1 != null){
                    examRtnBtn1.setAttribute('onclick', 'aurnaIframe("'+ NewHTML3 +'");');
                }
            }
        };
        xmlhttpRoutine.open("GET", url, true);
        xmlhttpRoutine.send();



        var examRoutineBtn = document.createElement("button");
        examRoutineBtn.innerHTML = 'See Exam Routine';
        examRoutineBtn.style.color = "#a82323";
        examRoutineBtn.style.fontWeight = "bold";
        examRoutineBtn.id = "examRoutineBtn";
        examRoutineBtn.setAttribute('class', 'plugsettingBtn');


        if(localStorage.getItem('studentDeptCode') == 'CSE'){
            var cseCourseContents = "Visit This Website to get Class Recordings: "+
                "<i><b><a href='https://tawsiftorabi.github.io/uiucse/' target='_blank'>UIU CSE CONTENTS</a></b></i>"
            ;
        }else{
            cseCourseContents = '';
        }



        var NewHTML = "<h2>"+metaData[2]+" <small>"+metaData[3]+"</small></h2>"
        + "<h4>User Settings: </h4>"
        + "<table>"
        + "<tr style='line-height: 8px;'>"
        + "<td style='padding:5px'><b>Student ID: "+ localStorage.getItem('studentIDVar') + " (" + U1customFunctions.GetStudentDeptCode(localStorage.getItem('studentIDVar')) + ")</b></td>"
        + "<td style='text-align: center; width: 180px;'></td>"
        + "</tr>"
        + "<tr style='line-height: 14px;border-bottom: 1pt dotted red;'>"
        + "    <td style='padding:5px'>Fix the PLUGIN Button to Top: </td>"
        + "<td style='text-align: center; width: 180px;'><input type='radio' name='fixpluginbtn' value='yes'/> Yes  <input type='radio' name='fixpluginbtn' value='no'/> No </td>"
        + "</tr>"
        + " <tr style='line-height: 14px;border-bottom: 1pt dotted #777;'>"
        + "    <td style='padding:5px'>Automatic load Current Trimester Routine in the Class Routine Page: </td>"
        + "    <td style='text-align: center; width: 180px;'><input type='radio' value='yes' name='AutoLoadRoutine'/> Yes  <input type='radio' name='AutoLoadRoutine' value='no'/> No </td>"
        + "</tr>"
        + "<tr style='line-height: 14px;border-bottom: 1pt dotted #777;'>"
        + "    <td style='padding:5px'>Show Class Routine Button on the Homepage: </td>"
        + "<td style='text-align: center; width: 180px;'><input type='radio' name='ShowRoutineBtn' value='yes'/> Yes  <input type='radio' name='ShowRoutineBtn' value='no'/> No </td>"
        + "</tr>"
        + "<tr style='line-height: 14px;border-bottom: 1pt dotted #777;'>"
        + "    <td style='padding:5px'>Add Courses Name to Routine at Homepage: </td>"
        + "<td style='text-align: center; width: 180px;'><input type='radio' name='AddCourseTitleRoutine' value='yes'/> Yes  <input type='radio' name='AddCourseTitleRoutine' value='no'/> No </td>"
        + "</tr>"
        + "<tr>"
        + "    <td style='padding:5px'></td>"
        + "    <td style='text-align: center; width: 180px;'></td>"
        + "</tr>"
        + "</table>"
        + "</br>"
        + cseCourseContents
        + "</br>"
        + "</br>"
        + "</br>"
        + "<center><a class='about-button' href='"+metaData[0]+"' target='_blank' style='padding: 5px 10px; text-decoration:none;'>"
        + "<svg id='miniIcons' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z'/></svg>"
        + "Me on Facebook"
        + "</a>&nbsp;&nbsp;"
        + "<a class='about-button' href='"+metaData[1]+"' target='_blank' style='padding: 5px 10px; text-decoration:none;'>"
        + "<svg id='miniIcons' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/></svg>"
        + "Code On Github</a></br></br><a target=\'_blank\'href=\'https://tawsiftorabi.github.io/ucamextended/#bug\'>REPORT A BUG</a></center>"
        ;

        var settingBtn = document.createElement("button");
        settingBtn.innerHTML = 'Plugin Settings';
        settingBtn.style.color = "black";
        settingBtn.style.fontWeight = "bold";
        settingBtn.setAttribute('class', 'plugsettingBtn');
        settingBtn.setAttribute('onclick', 'aurnaIframe("'+ NewHTML +'"); U1customFunctions.Setting1();');

        var titleText1 = document.createElement("span");
        titleText1.innerHTML = metaData[2];
        titleText1.style.color = "black";
        titleText1.fontWeight = "bold";
        titleText1.setAttribute('class', 'plugsettingBtn');

        var titleText2 = document.createElement("small");
        titleText2.innerHTML = "by <a href='"+ metaData[5] +"' target='_blank'>" + metaData[4] + "</a></br>";
        titleText2.style.color = "black";
        titleText2.style.fontSize = "9px";
        titleText2.setAttribute('class', 'plugsettingBtn');

        document.body.appendChild(floatboxHTML);
        floatboxHTML.appendChild(titleText1);
        floatboxHTML.appendChild(titleText2);
        floatboxHTML.appendChild(settingBtn);

        var GlobalSettings_3 = JSON.parse(localStorage.getItem('GlobalSettings'));
        var TrimesterInfoLocal = localStorage.getItem('TrimesterInfo');
        if(GlobalSettings_3.general[0].routineAvailble == 'yes'){
            floatboxHTML.appendChild(examRoutineBtn);
        }



    };

    ///////////////////////////////////////////////
    //Appened Floatbox function Ends/////////////
    ///////////////////////////////////////////////




    ///////////////////////////////////////////////
    //Set Floatbox Style function Starts/////////////
    ///////////////////////////////////////////////
    U1customFunctions.setFloatbox = function(){
        var elem0 = document.getElementById('floating_box');
        if(U1customFunctions.SetPluginBtn('get') == 'true'){
            elem0.style.position = 'fixed';
            console.log('setFloatbox Fixed');
        }else if(U1customFunctions.SetPluginBtn('get') == 'false'){
            elem0.style.position = 'absolute';
            console.log('setFloatbox Absolute');
        }
    };
    ///////////////////////////////////////////////
    //Set Floatbox Style function Ends/////////////
    ///////////////////////////////////////////////



    ///////////////////////////////////////////////
    //Fresher Welcome Message Starts//////////
    ///////////////////////////////////////////////

    U1customFunctions.fresherWelcome = function(){
        if(U1customFunctions.GetTrimesterInfo('CurrentBatch') == localStorage.getItem('studentBatchNumber')){
            alert('Hello Freshers!');
        }
    };
    ///////////////////////////////////////////////
    //Fresher Welcome Message Ends//////////
    ///////////////////////////////////////////////





    ///////////////////////////////////////////////
    //Array Matching Function Starts//////////
    ///////////////////////////////////////////////


    U1customFunctions.ArrayMatch = function(storedRoutePrev, routineArr){
        var storedRoute = storedRoutePrev;
		if(storedRoute !== null){
			if(storedRoute.split(',').length == routineArr.length){
				var j=0;
				for(i=0; routineArr.length>i; i++){
					if(storedRoute.split(',')[i] == routineArr[i]){
						 j++;
						//console.log(j);
						//console.log('Array Data Matched -> '+routineArr[i]+'/'+storedRoute.split(',')[i]);
					}else{
						//console.log('Array Data Mismatched -> '+routineArr[i]+'/'+storedRoute.split(',')[i]);
					}
				}

				//console.log('now j is ->' + j);
				//console.log('now storedRoute.split(",").length is ->' + storedRoute.split(',').length);
				//console.log('now routineArr.length is ->' + routineArr.length);

				if(j !== routineArr.length){
					//console.log('All Array Data Mismatched, returned false');
					return false;
				}else{
					//console.log('All Array Data Matched, returned true');
					return true;
				}
			}else{
				//console.log('All Array Length Mismatched, returned false');
				return false;
			}
		}else{
			return false;
		}
    }

    ///////////////////////////////////////////////
    //Array Matching Function Ends//////////
    ///////////////////////////////////////////////




    /**************
    ***************
    NECESSARY FUNCTION AND CODES ENDS
    **************
    **************/






    ////////////////////////////////////////////////
    /////////Starts Main Code/////////////
    ////////////////////////////////////////////////

    //Ektu Credits
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


    //Appened Other StyleSheets
    var css1 = document.createElement("link");
    css1.href = otherLinks[0];
    css1.type = "text/css";
    css1.rel = "stylesheet";
    document.body.appendChild(css1);



    if(U1customFunctions.PageChecker('login') == false){

        var SettingsArr;
        var xmlhttpSettings = new XMLHttpRequest();
        var settingJsonUrl = Jsonfiles[0];
        xmlhttpSettings.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                console.log('Settings JSON Request OK');
                SettingsArr = JSON.parse(this.responseText);
                U1customFunctions.SetSettings(SettingsArr);
                console.log(SettingsArr);
            }
        };
        xmlhttpSettings.open("GET", settingJsonUrl, true);
        xmlhttpSettings.send();



        //Necessary variable parsing
        var StudentId = document.getElementById('ctl00_lbtnUserName').innerHTML; //StudentID containing element from document

        var studentIDNullOP = (localStorage.getItem('studentIDVar') == null); //Check if student id is captured
        //if Student Id is not stored in browser
        if(studentIDNullOP == true){
            console.log('*Student ID not found in localStorage');

            //Check if id containing element is available in the document
            if(typeof(StudentId) != 'undefined' && StudentId != null){
                console.log('Stored ID from doc - '+ StudentId);
                localStorage.setItem('studentIDVar', StudentId);
                console.log('*Student ID stored');
                console.log('Stored ID - '+localStorage.getItem('studentIDVar'));

                localStorage.setItem('studentDeptCode', U1customFunctions.GetStudentDeptCode(StudentId));
                console.log('Dept. Code Stored - ' + U1customFunctions.GetStudentDeptCode(StudentId));

            } else{
                console.log('*Error finding Student ID Containing Element');
            }
        }

        //if Student Id is stored in browser
        if(studentIDNullOP == false){
            console.log('*Student ID found Stored previously');
            console.log('Stored Student ID - '+ localStorage.getItem('studentIDVar'));
            console.log('Dept. Code - ' + localStorage.getItem('studentDeptCode'));

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

                    localStorage.setItem('studentDeptCode', U1customFunctions.GetStudentDeptCode(StudentId));
                    console.log('Dept. Code Set - ' + U1customFunctions.GetStudentDeptCode(StudentId));

                    localStorage.setItem('studentBatchNumber', U1customFunctions.GetStudentBatchCode(StudentId));
                    console.log('Batch Code Set - ' + U1customFunctions.GetStudentBatchCode(StudentId));

                    //Reset FresherMsg
                    localStorage.setItem('FresherMsg', true);
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
        if(U1customFunctions.PageChecker('home') == true){


            //If The Student is fresher, show a dialogue box on login
            if(U1customFunctions.GetStudentBatchCode(localStorage.getItem('studentIDVar')) == U1customFunctions.GetTrimesterInfo('CurrentBatch')){
                U1customFunctions.fresherWelcome();
            }


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
                        NewAnchor1.lastChild.id = "classRoutineExt";

                        if(U1customFunctions.ShowRoutineBtn('get') == 'true'){
                            NewAnchor1.lastChild.style.display = "inherit";
                        }else if(U1customFunctions.ShowRoutineBtn('get') == 'false'){
                            NewAnchor1.lastChild.style.display = "none";
                            console.log('To Show routine btn, enable from settings.');
                        }

                    }
                }
            }else{
                console.log('Script Stopped, Can not find session id');
            }




            //Save Home Page Course and section information to local storage
            var HomeRoutineTable = document.getElementById('ctl00_MainContainer_Class_Schedule');
            var RoutineRowsElement = document.getElementsByClassName('hoverable');

            if(typeof(HomeRoutineTable) != 'undefined' && HomeRoutineTable != null){

                if((HomeRoutineTable.id == RoutineRowsElement[0].parentElement.parentElement.id) == true){
                    var routineRowsLength = RoutineRowsElement.length;
                    var CoursesArray = [];

                    for(var y=0; routineRowsLength>y; y++){
                        var elem12 = RoutineRowsElement[y].firstElementChild.textContent;
                        if(CoursesArray.some(element => element == elem12) == false){
                           CoursesArray.push(elem12);
                        }
                    }

                    if(U1customFunctions.ArrayMatch(localStorage.getItem('CurrentCoursesArray'), CoursesArray) == false){
                        localStorage.setItem('CurrentCoursesArray', CoursesArray);
                        console.log('Course List Updated');
                    } else{
                        console.log('Course List Matched');
                    }

                    if(U1customFunctions.ShowHomeCourseTitleRoutine('get') == 'true'){
                        U1customFunctions.SetTitleHomePageRoutine(true);
                    }

                }

            }





            //Ends Homepage Script

        }




        if(U1customFunctions.PageChecker('routine') == true){

            console.log('Routine Page Loaded! Initialized...');

            var BatchSelector = document.getElementById('ctl00_MainContainer_ddlAcaCalBatch');
            var CurrentBatchId = parseInt(localStorage.getItem('TrimesterInfo').split(':')[0])+1;

            if(U1customFunctions.AutoLoadClassRoutine('get') == 'true' && localStorage.getItem('AutoLoadRoutineStatus') == 'false'){
                for(var t=0; t<3; t++){
                    if(BatchSelector[t].innerHTML.isMatch(CurrentBatchId)){
                        BatchSelector.selectedIndex = t;
                        localStorage.setItem('AutoLoadRoutineStatus', true);
                        document.getElementById("ctl00_MainContainer_Button1").click();
                    }else{
                        console.log('No Matching Option found to load Routine of Current Trimester');
                    }
                }

            }

        }

        if(U1customFunctions.PageChecker('routine') !== true){
            localStorage.setItem('AutoLoadRoutineStatus', false);
            console.log('Routine Page Autoloader Status set as FALSE');
        }


		//Append Pugin Floatbox if the current page is not login page.
		U1customFunctions.AppendFloatbox();
        U1customFunctions.setFloatbox();
        U1customFunctions.FresherMsgInit();



    }else if(U1customFunctions.PageChecker('login') == true){
        console.log('This is login Page, Daddy told me to do nothing.')
    }


})();
