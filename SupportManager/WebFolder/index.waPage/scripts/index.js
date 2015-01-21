
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login = {};	// @login
	var documentEvent = {};	// @document
	var btnTickets = {};	// @button
	var btnProjects = {};	// @button
	var btnHome = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	login.logout = function login_logout (event)// @startlock
	{// @endlock
		// Hide buttons and containers after successful logout
		$("#btnProjects").hide();
		$("#btnTickets").hide();
			
		// Load home page into frame.
		document.getElementById('ifMain').src="/home.waPage/";

	};// @lock

	login.login = function login_login (event)// @startlock
	{// @endlock
		// Show buttons after successful login
		$("#btnProjects").show();
		$("#btnTickets").show();
			
	};// @lock
	


	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Detect screen width and center page
						
		centerPage();
				
		function centerPage() {
		userWidth = $(window).width();
		leftMargin = (userWidth - 1024)/2; 
		
		if (userWidth > 1024){
		$('#cntMain').css ("left", leftMargin);
	}
	}
		
		
		
		// Hide buttons until logged in.
		$("#btnProjects").hide();
		$("#btnTickets").hide();
			
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
	WAF.addListener("login", "logout", login.logout, "WAF");
	WAF.addListener("login", "login", login.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("btnTickets", "click", btnTickets.click, "WAF");
	WAF.addListener("btnProjects", "click", btnProjects.click, "WAF");
	WAF.addListener("btnHome", "click", btnHome.click, "WAF");
// @endregion
};// @endlock
