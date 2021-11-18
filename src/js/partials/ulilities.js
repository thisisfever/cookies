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

function deleteCookies(category) {
    let cookies = window.options.optional_cookies[category].cookies;
    console.log('Deleting '+category+' cookies', cookies);
    // console.log(window.options.optional_cookies[category].cookies);
    for (let c = 0; c < cookies.length; c++) {
        let encodedCookieName = cookies[c];

        if(getCookie(encodedCookieName) != null) {
            document.cookie = encodedCookieName + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT path=/; domain=' + window.location.hostname;
        }
    }
}

export { hasClass, setCookie, getCookie, deleteCookies }