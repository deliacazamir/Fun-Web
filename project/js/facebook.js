/*function checkLogin() {
	
	
		FB.getLoginStatus(function(response) {
		
		if(response.status == 'connected') {
			window.alert('we are logged already');
			return 1;
		}
		else
		{
			if(response.status == 'not_authorized') {
				window.alert('we are not logged in sadly');
				return 0;
			}
		}
		});
}
*/
function setCookie() {
	
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logging() {
     
     var token = getCookie("tokenID");
     console.log(token);
     if(token == "") {
     		
     		FB.login(function(response) {
		
		if(response.status == 'connected') {
			
			
			var x = response.authResponse.accessToken;
			var y  = response.authResponse.userID;
			document.cookie = "userID="+y+";";
			document.cookie = "tokenID="+x+";";


		}
		else
		{
			if(response.status == 'not_authorized') {
				window.alert('we are not logged in sadly');
		
			}
		}
		});
     		
     }
     else {
     		window.alert("Welcome again no");
     }
     
	  
}