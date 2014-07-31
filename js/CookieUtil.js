var CookieUtil = {

	get: function (name) {
		var cookieName = encodeURIComponent(name) + "=",         //encode the cookie name for search
			cookieStart = document.cookie.indexOf(cookieName),   //find the cookie name in document.cookie
			cookieValue = null;

		// If the cookie name exists, find the value
		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);

			// If doesn't find the semicolon, it is the only cookie stored
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}

		return cookieValue;
	},

	set: function (name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if (path) {
			cookieText += "; path=" + path;
		}

		if (domain) {
			cookieText += "; domain=" + domain;
		}

		if (secure) {
			cookieText += "; secure";
		}

		document.cookie = cookieText;
	},

	unset: function(name, path, domain, secure) {
		this.set(name, "", new Date(0), path, domain, secure);
	}

}