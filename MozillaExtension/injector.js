    /*
	Main Script Was Written for Tampermonkey Userscript Injector. 
	So, to get rid of the pain to rewrite the whole code 
	for web extention, I just made a simple Injector to inject the user script into the webpage.
	*/
	var script122 = document.createElement("script");
    script122.src = browser.runtime.getURL('main.js');
    document.body.appendChild(script122);