import { getCookie } from './partials/ulilities';
import { createNotice, createSettings } from './partials/ui';
import './partials/actions';

window.FeverCookies = function(userOptions) {

    // Set user options as global options
    window.options = userOptions;

    // Set defaults below

    if(window.options.domain == undefined) {
        window.options.domain = `.${window.location.hostname}`;
    }

    if(window.options.settings_toggle == undefined) {
        window.options.settings_toggle = false;
    }

    if(window.options.hasOwnProperty('policy') === false) {
        window.options.policy = {};
    }
    if(window.options.policy.link == undefined) {
        window.options.policy.link = '/privacy-policy/';
    }

    if(window.options.policy.name == undefined) {
        window.options.policy.name = 'Privacy Policy';
    }

    if(!window.options.message) {
        window.options.message = "We use cookies to enable essential site functionality, as well as marketing, and analytics. You may change your settings at any time.";
    }
    if(window.options.hasOwnProperty('colours') === false) {
        window.options.colours = {};
    }
    if(!window.options.colours.background || window.options.colours.background == 'white') {
        window.options.colours.background = '#fff';
    }
    if(!window.options.colours.text || window.options.colours.text == 'dark') {
        window.options.colours.text = '#333';
    }
    if(!window.options.colours.button || window.options.colours.button == 'green') {
        window.options.colours.button = '#008845';
    }

    if(getCookie('cookie_settings') == null) {
        createNotice();
    } else {
        enableScriptsByCat();
    }
    
    createSettings();
}
