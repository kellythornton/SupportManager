
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var btnAddNote = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	btnAddNote.click = function btnAddNote_click (event)// @startlock
	{// @endlock
		// Add text from note input box to current note display box.
		
		var newNote = document.getElementById('tiAddNote').value;
		var oldNote = document.getElementById('txtNotes').innerHTML;
		var currentUser = WAF.directory.currentUser().fullName;
		
		getTheDate();
		
		function getTheDate() {
		
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
	}
			
		//noteUpdate = oldNote + "<br>" + "<br>" + newNote + "<br>" + "<i>Created by: " + currentUser + " on " + today + "</i>";
		noteUpdate = oldNote + newNote + "<br><i>Created by: " + currentUser + " on " + today + "</i><br><br>";
		
		document.getElementById('txtNotes').innerHTML = noteUpdate;
	
		// Tell the server to send a message to Char to let her know that a project has been added or modified.
		idNumber = document.getElementById('txtProjectID').innerHTML;
		mailSummary = document.getElementById('txtSummary').innerHTML;
		createdByName = (WAF.directory.currentUser().fullName);
		notes = document.getElementById('txtNotes').innerHTML;
		mailType = "projectNote";

				
	mail.sendUpdateEmailAsync({
	'onSuccess': function(result) {
        console.log(result);
    },
    'onError': function(error){ 
        console.log('An error occured: '+error); 
    },  
    'params': [idNumber, mailSummary, createdByName, mailType, notes]
});	
		
		
		sources.project.notes = noteUpdate;
		sources.project.save();	
		document.getElementById('tiAddNote').value = ""
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
	
		//Hide container until authenticated
		$("#cntProjects").hide();
		$("#btnNewProject").hide();
		$("#btnNewProjectUser").hide();
				
		// Call the checkPermissions function
		{
		checkPermissions();
	};
		
		// Verify authorization to view page.  If logged in with proper permissions display page, otherwise redirect to unauthorized page.
		function checkPermissions() {
		if (WAF.directory.currentUserBelongsTo("Admin"))
		{
		$("#cntProjects").show();
		$("#btnNewProject").show();
	}
		
		
		else if (WAF.directory.currentUserBelongsTo("User"))
		{
		$("#cntProjects").show();
		$("#btnNewProjectUser").show();
		$("#btnNewProjectUser").css("left","426px");
	}
	
		else
		{
		document.getElementById('ifMain').src="/home.waPage/";
		}
	}
			
	};// @lock
	


// @region eventManager// @startlock
	WAF.addListener("btnAddNote", "click", btnAddNote.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
