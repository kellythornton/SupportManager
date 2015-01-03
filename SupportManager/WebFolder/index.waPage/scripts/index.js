
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var btnEmployees = {};	// @button
	var btnTickets = {};	// @button
	var btnProjects = {};	// @button
	var btnHome = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	btnEmployees.click = function btnEmployees_click (event)// @startlock
	{// @endlock
		document.getElementById('ifMain').src="/employees.waPage/";
	};// @lock

	btnTickets.click = function btnTickets_click (event)// @startlock
	{// @endlock
		document.getElementById('ifMain').src="/tickets.waPage/";
	};// @lock

	btnProjects.click = function btnProjects_click (event)// @startlock
	{// @endlock
		document.getElementById('ifMain').src="/projects.waPage/";
	};// @lock

	btnHome.click = function btnHome_click (event)// @startlock
	{// @endlock
		document.getElementById('ifMain').src="/home.waPage/";
	};// @lock

// Assign appropriate menu items to display the correct page in the mainFrame frame widget.
	
	

// @region eventManager// @startlock
	WAF.addListener("btnEmployees", "click", btnEmployees.click, "WAF");
	WAF.addListener("btnTickets", "click", btnTickets.click, "WAF");
	WAF.addListener("btnProjects", "click", btnProjects.click, "WAF");
	WAF.addListener("btnHome", "click", btnHome.click, "WAF");
// @endregion
};// @endlock
