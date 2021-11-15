import { getCookie } from './ulilities';

function createNotice() {
    // Set variables
    let button_text = 'Accept & Continue';
    if(window.options.colours.background == 'white') { window.options.colours.background = '#fff' }
    if(window.options.colours.text == 'dark') { window.options.colours.text = '#333' }
    if(window.options.colours.button == 'green') { window.options.colours.button = '#008845' }
    
    // Cookie notice HTML
    let cookieNotice = document.createElement('div');
    cookieNotice.innerHTML = `<div id="fvr-cn-title" class="fvr-cn-title" role="heading" aria-level="1">This website uses cookies</div>
    <div class="fvr-cn-body" style="color:${window.options.colours.text}">${window.options.message}</div>
    <div class="fvr-cn-actions"><button id="fvr-cn-manage" class="fvr-cookies-btn-secondary fvr-cookies-btn" style="color:${window.options.colours.text};" onClick="toggleSettings()" tabindex="0">Manage Cookies</button><button class="fvr-cookies-btn-primary fvr-cookies-btn" style="background:${window.options.colours.button};color:${window.options.colours.background}" onClick="acceptAllCookies()" tabindex="0">${button_text}</button></div>`;
    cookieNotice.setAttribute('class', 'fvr-cookie-notice');
    cookieNotice.setAttribute('id', 'fvr-cookie-notice');
    cookieNotice.setAttribute('style', 'background:'+window.options.colours.background);
    cookieNotice.setAttribute('role', 'dialog');
    cookieNotice.setAttribute('aria-labelledby', 'fvr-cn-title');
    cookieNotice.setAttribute('aria-hidden', false);
    document.body.appendChild(cookieNotice);
    cookieNotice.className = 'fvr-cookie-notice fvr-cn-active';
}

function createSettings() {
    // Set varibales
    let settings_information_1 = 'These cookies are required for you to use our website. Without these cookies, services you have asked for cannot be provided.';
    let settings_information_2 = 'These cookies help us improve our website by collecting and reporting information on its usage. The information these cookies collect is anonymous.';
    let settings_information_3 = 'These cookies are used to track visitors across websites to allow publishers to display relevant and engaging advertisements.';

    // Settings panel HTML
    let cookieSettings = document.createElement('div');
    // <div class="fvr-cs-close" onClick="toggleSettings()">&times;</div>
    cookieSettings.innerHTML = `<div class="fvr-cs-modal" role="dialog" aria-labelledby="fvr-cs-title"><div id="fvr-cs-title" class="fvr-cs-header" role="heading" aria-level="1" tabindex="0">Cookie Settings</div><div class="fvr-cs-cat"><div class="fvr-cs-cat-heading" role="heading" aria-level="2">Essential Cookies</div><label class="fvr-switch" aria-hidden="true"><span class="fvr-sr-only">Essential Cookies</span><input type="checkbox" class="fvr-switch-input" disabled checked aria-label="Essential Cookies"><div class="fvr-switch-btn"></div></label></div><div class="fvr-cs-body">${settings_information_1}</div><div class="fvr-cs-cat"><div class="fvr-cs-cat-heading" role="heading" aria-level="2">Analytics Cookies</div><label class="fvr-switch"><span class="fvr-sr-only">Analytics Cookies</span><input type="checkbox" id="fvr-cs-cat-analytics" class="fvr-switch-input" tabindex="0" aria-label="Analytics Cookies"><div class="fvr-switch-btn"></div></label></div><div class="fvr-cs-body">${settings_information_2}</div><div class="fvr-cs-cat"><div class="fvr-cs-cat-heading" role="heading" aria-level="2">Marketing Cookies</div><label class="fvr-switch"><span class="fvr-sr-only">Marketing Cookies</span><input type="checkbox" id="fvr-cs-cat-marketing" class="fvr-switch-input" tabindex="0" aria-label="Marketing Cookies"><div class="fvr-switch-btn"></div></label></div><div class="fvr-cs-body">${settings_information_3}</div><div class="fvr-cs-body" style="margin: 20px 0 25px 0;">See our <a href="${window.options.policy.link}">${window.options.policy.name}</a> for more details.</div><div class="fvr-cs-actions"><button id="fvr-cookies-save" class="fvr-cookies-btn-primary fvr-cookies-btn" onClick="saveSettings()" tabindex="0">Save</button><button id="fvr-cookies-accept-all" class="fvr-cookies-btn-primary fvr-cookies-btn" style="background:${window.options.colours.button};color:${window.options.colours.background}" onClick="acceptAllCookies()" tabindex="0">Accept All Cookies</button></div><div class="fvr-cs-powered">Powered by <a href="https://cookies.thisisfever.co.uk/" target="_blank" tabindex="-1">Fever Cookies</a></div></div>`;
    cookieSettings.setAttribute('id', 'fvr-cookie-settings');
    cookieSettings.setAttribute('class', 'fvr-cookie-settings');
    document.body.appendChild(cookieSettings);

    // Set user's current selection on the checkboxes
    let settings = JSON.parse(getCookie('cookie_settings'));
    if(settings != null) {
        document.getElementById('fvr-cs-cat-analytics').checked = settings.analytics;
        document.getElementById('fvr-cs-cat-marketing').checked = settings.marketing;
    }

    console.log('Cookie settings loaded');

    // Add listener for user's settings toggle element
    if(window.options.settings_toggle) {
        let settingsToggle = document.querySelector(window.options.settings_toggle);
        // console.log(settingsToggle);
        settingsToggle.addEventListener('click', event => {
            console.log('Cookie settings toggled');
            event.preventDefault();
            toggleSettings();
        });
    }
}

export { createNotice, createSettings };