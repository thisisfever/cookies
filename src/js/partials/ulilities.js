function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
function setCookie(name,value,days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = ';expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + ';domain='+window.options.domain+';path=/;SameSite=Lax;';
    // document.cookie = name + "=" + (value || "")  + expires + "; path=/; domain="+window.options.domain+"; SameSite=None; Secure";
}
function getCookie(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function clearAllCookiePaths(cookieBase) {
    let p = window.location.pathname.split('/');
    window.document.cookie = cookieBase + '; path=/';
    while (p.length > 0) {
          window.document.cookie = cookieBase + '; path=' + p.join('/');
          p.pop();
    };
}
function deleteCookies(category) {
    let cookies = window.options.optional_cookies[category].cookies;
    console.log('Deleting '+category+' cookies', cookies);
    // console.log(window.options.optional_cookies[category].cookies);
    for (let c = 0; c < cookies.length; c++) {
        let encodedCookieName = cookies[c];
        // This method ensures all instances of the cookie are removed.
        let cookieBase = encodedCookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        clearAllCookiePaths(cookieBase);
    
        let d = window.location.hostname.split('.');
        while (d.length > 0) {
            clearAllCookiePaths(cookieBase + '; domain=' + d.join('.'));
            d.shift();
        }
    }
}

export { hasClass, setCookie, getCookie, deleteCookies }