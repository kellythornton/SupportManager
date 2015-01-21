
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var uploadProject = {};	// @fileUpload
	var btnSave = {};	// @button
	var btnDeleteNo = {};	// @button
	var btnDeleteYes = {};	// @button
	var btnEmployeeDelete = {};	// @button
	var btnNew = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	uploadProject.filesUploaded = function uploadProject_filesUploaded (event)// @startlock
	{// @endlock
	// Add your code here
	var fLinkFileName = []; //name of the file
	var newFileNameList = "";
	var fLinkFileLoc = []; //location of the file
	var newFileNameLoc = "";

	//Loop to get the name and location of the file uploaded then create a hyperlink to the file and post it to the textbox.
	

	function ListFileLoc(element, index, array) {
    	fLinkFileLoc.push(array[index].filename); //put the file names in an array
        }
		
    if(event.response.length !=0) { //if there were any files uploaded
        
        v = document.getElementById('tiFiles').value;
        x = "";
        n = "";
        //folder = "file://http://192.168.2.230:8081//Volumes/Macintosh HD/Users/kellyt/Documents/Wakanda/SupportManager 20150114/SupportManager/DataFolder/ProjectDocuments/";
        event.response.forEach(ListFileLoc);
        for (i = 0; i < fLinkFileLoc.length; i++){
        	filePath = event.response.path;
        	alert(filePath);
//        file = folder + fLinkFileLoc[i];
//        	if (File.isFile(file)) {
//        		 n = n + (fLinkFileLoc[i] + "\n");
//        		 }
//        	else {
        x = x + '<a href = "file://http://192.168.2.230:8081//Volumes/Macintosh HD/Users/kellyt/Documents/Wakanda/SupportManager 20150114/SupportManager/DataFolder/ProjectDocuments/' + fLinkFileLoc[i] + '">' + fLinkFileLoc[i] + '</a>' + "<BR>";
        n = n + (fLinkFileLoc[i] + "\n");
   //}
    }
    	document.getElementById('tiFiles').value = v + x + "<BR>";
   		alert("Successfully Uploaded: " + n);
   		sources.project.files = document.getElementById('tiFiles').value;
 		sources.project.save();
    }
	};// @lock

	btnSave.click = function btnSave_click (event)// @startlock
	{// @endlock
	//Send a message to the user to tell them the project has been saved
	alert("The project has been saved");
		
	// Tell the server to send a message to Char to let her know that a project has been added or modified.
	idNumber = document.getElementById('txtProjectNumber').innerHTML;
	mailSummary = document.getElementById('tiSummary').value;
	createdByName = (WAF.directory.currentUser().fullName);
	notes = document.getElementById('tiNotes').value;
		
	if (newProject == "true"){
	mailType = "newProject"
}
	else {mailType = "modifiedProject"}


//	//Create list of people to be emailed
//	mailList = [createdByName, createdBy];
//	mail.emailToListAsync({
//	'onSuccess': function(result) {
//		console.log(result);
//	},
//	'onError': function(error){
//		console.log('An error occured: '+error);
//	},
//	'params': mailList
//});

	//Send the email
			
	mail.sendUpdateEmailAsync({
	'onSuccess': function(result) {
        console.log(result);
    },
    'onError': function(error){ 
        console.log('An error occured: '+error); 
    },  
    'params': [idNumber, mailSummary, createdByName, mailType, notes]
});	

	// set new ticket to "false"
	newProject = "false";
	};// @lock

	btnDeleteNo.click = function btnDeleteNo_click (event)// @startlock
	{// @endlock
	// When No button is clicked Wakanda does nothing with the database record.  Confirm message and yes/no buttons are hidden.  Delete record button is shown.
	$('#btnDeleteYes').hide();
	$('#btnDeleteNo').hide();
	$('#txtDeleteConfirm').hide(); 
	$('#btnEmployeeDelete').show();
	};// @lock

	btnDeleteYes.click = function btnDeleteYes_click (event)// @startlock
	{// @endlock
	// When Yes button is clicked Wakanda deletes the record from the database.  Confirm message and yes/no buttons are hidden.  Delete record button is shown.
	$('#btnDeleteYes').hide();
	$('#btnDeleteNo').hide();
	$('#txtDeleteConfirm').hide(); 
	$('#btnEmployeeDelete').show();
	alert("The project has been deleted!"); 
	
	// Tell the server to send a message to Char to let her know that a project has been deleted.
	idNumber = document.getElementById('txtProjectNumber').innerHTML;
	mailSummary = document.getElementById('tiSummary').value;
	createdByName = (WAF.directory.currentUser().fullName);
	notes = document.getElementById('tiNotes').value;
		
	if (newProject == "true"){
	mailType = "projectDeleted"
}
	else {mailType = "modifiedProject"}
			
	mail.sendUpdateEmailAsync({
	'onSuccess': function(result) {
        console.log(result);
    },
    'onError': function(error){ 
        console.log('An error occured: '+error); 
    },  
    'params': [idNumber, mailSummary, createdByName, mailType, notes]
});
	
	};// @lock

	btnEmployeeDelete.click = function btnEmployeeDelete_click (event)// @startlock
	{// @endlock
	// When delete button is pressed:  Hide delete button and show confirm message and yes/no buttons.
	$('#btnDeleteYes').show();
	$('#btnDeleteNo').show();
	$('#txtDeleteConfirm').show();
	$('#btnEmployeeDelete').hide();
	};// @lock

	btnNew.click = function btnNew_click (event)// @startlock
	{// @endlock
		// Assign value to createdby and created date fields

		modifyConstants();
		
		function modifyConstants() {
		
		// Get current date and format to mm/dd/yyyy		
		d = new Date();
		
		if (d.getMonth() <= 9) { 
		month = "0" + (d.getMonth() + 1);
		} else { 
		month = (d.getMonth() +1);
		}
		
		if (d.getDate() <= 9) {
			day = "0" + d.getDate();
		}else {
			day = d.getDate();
		}
		
		today = month + "/" + day + "/" + d.getFullYear();
		
		//Assign values to the current date and modified text input boxes.
		document.getElementById('tiCurrentDate').value = today;
		
		createdByName = (WAF.directory.currentUser().fullName);
		document.getElementById('tiCreatedBy').value = createdByName;
		
		// Put values into database
		sources.project.createdDate = today;
		sources.project.createdBy = createdByName;
		}	
		
		// Set newProject to "true"
		newProject = "true";
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//Hide delete confirm message and yes/no buttons on page load
		$('#btnDeleteYes').hide();
		$('#btnDeleteNo').hide();
		$('#txtDeleteConfirm').hide();
		
		//Hide container until authenticated
		$("#cntNewProject").hide();
		
		// set new ticket to "false"
		newProject = "false";
			
		
		// Call the checkPermissions function
		{
		checkPermissions();
	};
		
		// Verify authorization to view page.  If logged in with proper permissions display page and permitted objects, otherwise redirect to home page.
		function checkPermissions() {
		if (WAF.directory.currentUserBelongsTo("Admin"))
		{
		$("#cntNewProject").show();
		$("#txtInstructions").hide();
		$("#cntDivide").hide();
	}
		
		
		else if (WAF.directory.currentUserBelongsTo("User"))
		{
				
		$("#cntNewProject").show();				
		$("#grdProjects").hide();
		$("#txtInstructions").show();
		$('#btnEmployeeDelete').hide();
		$('#btnNext').hide();
		$('#btnBack').hide();
		$("document").ready(function () {
        $('#btnNew').trigger('click');
    });
								
	}
	
		else
		{
		document.getElementById('ifMain').src="/home.waPage/";
		}
	}
	

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("uploadProject", "filesUploaded", uploadProject.filesUploaded, "WAF");
	WAF.addListener("btnSave", "click", btnSave.click, "WAF");
	WAF.addListener("btnDeleteNo", "click", btnDeleteNo.click, "WAF");
	WAF.addListener("btnDeleteYes", "click", btnDeleteYes.click, "WAF");
	WAF.addListener("btnEmployeeDelete", "click", btnEmployeeDelete.click, "WAF");
	WAF.addListener("btnNew", "click", btnNew.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
