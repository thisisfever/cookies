import { hasClass, setCookie, getCookie, deleteCookies } from './ulilities';

// Loop through each cookie category and enable based on user choice
window.enableScriptsByCat = function() {
    let settings = JSON.parse(getCookie('cookie_settings'));

    // Loop through cookie categories
    for (const key in settings) {
        // If user has enabled current category, loop through scripts
        if (settings.hasOwnProperty(key) && settings[key] === true) {
            // Loop through each script and create a new one to run
            document.querySelectorAll('script[data-cookie="'+key+'"]').forEach((script) => {
                let n = document.createElement('script');
                n.setAttribute('type', 'text/javascript');
                n.setAttribute('data-cookie', script.getAttribute('data-cookie'));
                if(script.getAttribute('src') !== null) {
                    n.setAttribute('src', script.getAttribute('src'));
                }
                // If it's inline we need to set the script contents
                n.text = script.innerHTML;
                // Append newly created script to the <head>
                document.head.appendChild(n);
                // Remove orignal script from the DOM
                script.parentNode.removeChild(script);
            });
            // Run user set custom JS when category is enabled
            if(window.options.optional_cookies.hasOwnProperty(key) && window.options.optional_cookies[key].onAccept !== undefined && typeof window.options.optional_cookies[key].onAccept == "function") {		
                window.options.optional_cookies[key].onAccept();
            }
        } else {
            // Run user set custom JS when category is disabled
            if(window.options.optional_cookies.hasOwnProperty(key) && window.options.optional_cookies[key].onRevoke !== undefined && typeof window.options.optional_cookies[key].onRevoke == "function") {		
                window.options.optional_cookies[key].onRevoke();
            }
            // If not enabled, remove from dom
            document.querySelectorAll('script[data-cookie="'+key+'"]').forEach((script) => {
                script.parentNode.removeChild(script);
            });
            // Delete cookies
            deleteCookies(key);
        }
    }
    console.log('Cookies settings saved');
}

window.acceptAllCookies = function() {
    let notice = document.getElementById('fvr-cookie-notice');
    if(notice != null) {
        notice.classList.remove('fvr-cn-active');
        notice.setAttribute('aria-hidden', true);
    }
    saveSettings(true);
}

window.saveSettings = function(acceptAll = false) {
    // Get checkbox elements
    let analyticsSetting = document.getElementById('fvr-cs-cat-analytics');
    let marketingSetting = document.getElementById('fvr-cs-cat-marketing');

    if(acceptAll) {
        analyticsSetting.checked = true;
        marketingSetting.checked = true;
    }

    // Create object with checked status
    let settings = {
        'analytics': analyticsSetting.checked,
        'marketing': marketingSetting.checked,
    }
    
    // Store settings as a cookie
    setCookie('cookie_settings', JSON.stringify(settings), '365');
    
    // Load or block cookie scripts
    enableScriptsByCat();

    window.toggleSettings();
}

window.toggleSettings = function() {
    if(getCookie('cookie_settings') == null) {
        let notice = document.getElementById('fvr-cookie-notice');
        let manage = document.getElementById('fvr-cn-manage');
        if(hasClass(notice, 'fvr-cn-active')) {
            notice.classList.remove('fvr-cn-active');
            notice.setAttribute('aria-hidden', true);
        } else {
            notice.classList.add('fvr-cn-active');
            notice.setAttribute('aria-hidden', false);
            manage.focus();
        }
    }

    let settings = document.getElementById('fvr-cookie-settings');
    if(hasClass(settings, 'fvr-cs-active')) {
        settings.classList.remove('fvr-cs-active');

        if(getCookie('cookie_settings') == null) {
            manage.focus();
        } else {
            let settingsToggle = document.querySelector(window.options.settings_toggle);
            settingsToggle.focus();
        }
    } else {
        settings.classList.add('fvr-cs-active');
        let focus = document.getElementById('fvr-cs-title');
        focus.focus();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        let settings = document.getElementById('fvr-cookie-settings');
        if(hasClass(settings, 'fvr-cs-active')) {
            window.toggleSettings();
        }
    }
});

// const switches = document.getElementByClass('fvr-switch');
// switches.addEventListener('keydown', function(event) {
//     if (event.key === 'Space') {
//         console.log('test');
//         // let settings = document.getElementById('fvr-cookie-settings');
//         // if(hasClass(settings, 'fvr-cs-active')) {
//         //     window.toggleSettings();
//         // }
//     }
// });