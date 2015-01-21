
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var tiSearch = {};	// @textField
	var btnSearch = {};	// @buttonImage
	var btnSave = {};	// @button
	var btnDeleteNo = {};	// @button
	var btnDeleteYes = {};	// @button
	var btnEmployeeDelete = {};	// @button
	var btnNew = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	tiSearch.keyup = function tiSearch_keyup (event)// @startlock
	{// @endlock
	// Perform search on Keyup events
	var theTicket = $$("tiSearch").getValue();
	if (theTicket === '') {
		sources.Ticket.allEntities();
	}	
	else{
	sources.ticket.query('TicketID = :1 order by TicketID', {params : [theTicket + '*']});
}
	};// @lock

	btnSearch.click = function btnSearch_click (event)// @startlock
	{// @endlock
	//sources.ticket.query('TicketID = :1 order by TicketID', {params : [queryStr + '*']});
	var assigned = $$("cbboxAssignedTo").getValue();
	alert(assigned);
	};// @lock

	btnSave.click = function btnSave_click (event)// @startlock
	{// @endlock
	// Send a message to inform the user that the ticket has been saved
	alert("The ticket has been saved");
	
	// Tell the server to send an email to inform that a ticket has been added or modified.
	idNumber = document.getElementById('txtTicketNumber').innerHTML;
	mailSummary = document.getElementById('tiSummary').value;
	createdByName = (WAF.directory.currentUser().fullName);
	notes = document.getElementById('tiNotes').value;
		
	if (newTicket == "true"){
	mailType = "newTicket"
}
	else {mailType = "modifiedTicket"}
			
	mail.sendUpdateEmailAsync({
	'onSuccess': function(result) {
        console.log(result);
    },
    'onError': function(error){ 
        console.log('An error occured: '+error); 
    },  
    'params': [idNumber, mailSummary, createdByName, mailType, notes]
});	

	// set new ticket to "false" so that future email updates do not say it is a new ticket
	newTicket = "false";
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
	alert("The ticket has been deleted!");
	
	// Tell the server to send a message to Char to let her know that a ticket has been deleted.
	idNumber = document.getElementById('txtTicketNumber').innerHTML;
	mailSummary = document.getElementById('tiSummary').value;
	createdByName = (WAF.directory.currentUser().fullName);
	notes = document.getElementById('tiNotes').value;
	mailType = "ticketDeleted";
			
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
		// Set ticket number to New Ticket if null.
		if (document.getElementById('txtTicketNumber').innerHTML = " ") {document.getElementById('txtTicketNumber').innerHTML = "New Ticket"}
		else { };
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
		document.getElementById('tiCreatedDate').value = today;
		
		createdByName = (WAF.directory.currentUser().fullName);
		document.getElementById('tiCreatedBy').value = createdByName;
		
		// Put values into database
		sources.ticket.createdDate = today;
		sources.ticket.createdBy = createdByName;
		}	
		
		// Set newTicket to "true"
		newTicket = "true";
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		//Hide delete confirm message and yes/no buttons on page load
		$('#btnDeleteYes').hide();
		$('#btnDeleteNo').hide();
		$('#txtDeleteConfirm').hide();
		$('#btnEmployeeDelete').hide();
		//Hide container until authenticated
		$("#cntNewTicket").hide();
			
		// set new ticket to "false"
		newTicket = "false";
		
		// Call the checkPermissions function
		{
		checkPermissions();
	};
		
		// Verify authorization to view page.  If logged in with proper permissions display page and permitted objects, otherwise redirect to home page.
		function checkPermissions() {
		if (WAF.directory.currentUserBelongsTo("Admin"))
		{
		$("#cntNewTicket").show();
		$("#txtInstructions").hide();
		$("#cntDivide").hide();
		$("#btnEmployeeDelete").show();
	}
		
		
		else if (WAF.directory.currentUserBelongsTo("User"))
		{
		$("#cntNewTicket").show();				
		$("#grdTickets").hide();
		$("#txtInstructions").show();
		$('#btnNext').hide();
		$('#btnBack').hide();
								
	}
	
		
	}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("tiSearch", "keyup", tiSearch.keyup, "WAF");
	WAF.addListener("btnSearch", "click", btnSearch.click, "WAF");
	WAF.addListener("btnSave", "click", btnSave.click, "WAF");
	WAF.addListener("btnDeleteNo", "click", btnDeleteNo.click, "WAF");
	WAF.addListener("btnDeleteYes", "click", btnDeleteYes.click, "WAF");
	WAF.addListener("btnEmployeeDelete", "click", btnEmployeeDelete.click, "WAF");
	WAF.addListener("btnNew", "click", btnNew.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
