				//Code Written by @TawsifTorabi
				//Licensded under GNU GCC Public License
				//Both Commercial and Personal Use is Granted
				
				var version = '1.0.3 Beta';
				
				
				
			document.onkeydown=function(e){
								if(e.which == 27) {
								 esc();
								 return false;
								}
							}
							
			function esc(){
				hideIframe();
				parent.hideIframe();
			}


			function aurnaIframe(url){
				var src = url;
				document.getElementById('lightboxframe1').src = src;
				var body = document.getElementsByTagName("body")[0];
				var originalstyle = body.style;
				body.style = "overflow: hidden;";
				document.getElementById('lightbox').style = 'display: inline;';
			}
							

			function hideIframe(){
				var doc = document.getElementById('lightbox');
				var hide = ('display:none;');
				var body = document.getElementsByTagName("body")[0];
				var originalstyle = body.style;
				body.style = "overflow: inline;";
				doc.style = hide;
				setTimeout(function(){document.getElementById('lightboxframe1').src = null;}, 1000);
			}



    var AurnaDivlightbox = document.createElement('div'); 
		AurnaDivlightbox.style.cssText = 'display:none;';
		AurnaDivlightbox.setAttribute("id", "lightbox");
			
    var AurnaTextBoxBackground = document.createElement('div');
		AurnaTextBoxBackground.setAttribute("class", "aurna-textlightbox-background fade-in");
		AurnaDivlightbox.appendChild(AurnaTextBoxBackground);
		
	var AurnaTextBoxArea = document.createElement('div');
		AurnaTextBoxArea.setAttribute("class", "aurna-textlightbox-area fade-in");
		AurnaTextBoxBackground.appendChild(AurnaTextBoxArea);
		
	var AurnaCloseButton = document.createElement('button');
		AurnaCloseButton.setAttribute("class", "aurna-textlightbox-area-close");
		AurnaCloseButton.setAttribute("onclick", "hideIframe()");
		AurnaCloseButton.innerHTML = '&times;';
		AurnaTextBoxArea.appendChild(AurnaCloseButton);
	
	var AurnaCredit = document.createElement('small');
		AurnaCredit.setAttribute("class", "aurna-cont");
		AurnaCredit.innerHTML = 'Aurna LightBox '+ version;
		AurnaTextBoxArea.appendChild(AurnaCredit);
		
	var AurnaCenter = document.createElement('center');
		AurnaTextBoxArea.appendChild(AurnaCenter);
		
	var AurnaIntrinsic = document.createElement('div');
		AurnaIntrinsic.setAttribute("class", "intrinsic-container");
		AurnaCenter.appendChild(AurnaIntrinsic);
	
	var AurnaIframe = document.createElement('iframe');
		AurnaIframe.setAttribute("id", "lightboxframe1");
		AurnaIframe.style.cssText = 'border:none; height:480px; width: 100%;';
		AurnaIframe.setAttribute("src", "");
		AurnaIframe.innerHTML = 'Loading...';
		AurnaIntrinsic.appendChild(AurnaIframe);
    
    window.onload = document.body.appendChild(AurnaDivlightbox);