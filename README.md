<div align="center">

<a href="https://www.thisisfever.co.uk/" style="margin: 0">
    <img alt="This is Fever" src="https://www.thisisfever.co.uk/assets/img/general/logo.svg" height="24">
</a>

<h1 style="margin-top: 10px">Fever Cookies</h1>
<p>A simple, lightweight cookie consent system.</p>
</div>

## Features 

- Only run cookies if user accepts
- Allows preference to be changed at any time via settings
- Splits cookies into categories

## Getting Started

### CDN
To start using Fever Cookies right away, you can use the CDN to serve the files as close, and fast as possible to users.

Simply add the CSS & JS in your `<head>`:

```html
<link rel="stylesheet" type="text/css" media="screen" href="//cdn.jsdelivr.net/npm/@thisisfever/cookies@1/dist/fever-cookies.min.css" />
<script src="//cdn.jsdelivr.net/npm/@thisisfever/cookies@1/dist/fever-cookies.min.js" defer></script>
```
### NPM Package
> Note: If you intend to use Fever Cookies with the CDN, you can skip this

1. Install package via Terminal
    ```shell
    $ npm install @thisisfever/cookies
    ```
2. Import to your JS file
   ```js
   import '~@thisisfever/cookies/src/fever-cookies';
   ```

## Usage 

First you need to initilise Fever Cookies.

1. Add the following in your `<head>`, below the CSS & JS.

   ```html
   <script>
       window.addEventListener('load', function() {
           window.FeverCookies({
               settings_toggle: '.cookie-settings-btn',
               policy: {
                   link: '/cookies-policy/',
                   name: 'Cookies Policy',
               },
               optional_cookies: {
                   analytics: {
                       cookies: [],
                       onAccept: function() {
                       
                       },
                       onRevoke: function() {
                       
                       }
                   },
                   marketing: {
                       cookies: [],
                       onAccept: function() {

                       },
                       onRevoke: function() {
                           
                       }
                   }
               }
           });
       });
   </script>
   ```

2. To start adding scripts, you can integrate in two ways, or a combination of both:
   1. Modify each script tag
   2. Add JS directly into Fever Cookies

    ### Modify Scripts
    To prevent a script from loading (unless the relevent category has been chosen by the user), you need to modify the script.

    We need to add `data-cookie="[category]` and `type="text/plain"` to the script tag.

   For example, Google Analytics would look like this:
   ```html
   <script type="text/plain" data-cookie="analytics" async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
   ```

   > **Important:** For each category, you must fill in the the `cookies: []` array with the names of the cookies used within that category.

   ### Add JS to Fever Cookies
   When you initialse the package, there is a `optional_cookies` object.

   ```js
   optional_cookies: {
       analytics: {
           cookies: [],
           onAccept: function() {
           
           },
           onRevoke: function() {
           
           }
       },
       marketing: {
           cookies: [],
           onAccept: function() {

           },
           onRevoke: function() {
               
           }
       }
   }
   ```

   For each category, you must fill in the the `cookies: []` array with the names of the cookies used within that category.

   For example, Google Analytics would be:
   ```js
   cookies: ['_ga', '_gid', '_gat', '_gat_gtag_UA_XXXXXXXX_X'],
   ```

   For any JS you wish to run when a category is accepted, add it directly to the category's `onAccept`. 
   ```js
   onAccept: function() {
       // This category has been accepted, run JS here
   },
   ```
   Likewise, you can add any JS you wish to run when a category has been revoked using `onRevoke`
   ```js
   onRevoke: function() {
       // This category has been revoked, run JS here
   },
   ```

## Options

`window.FeverCookies` accepts options to help tailor to each site.

| Option | Type | Required | Description |
|---|---|---|---|
| `settings_toggle` | string | Yes | Element selector. Can be either `.class` or `#id` |
| `optional_cookies` | object | Yes | Triggers for each cookie category |
| `policy` | object | No | Override default policy name & link. Accepts two keys; `name` `link` |
| `message` | string | No | Override the default notice message |


## Examples

See below for a full example.

```html
<!-- Google Analytics Example - Remove unless needed -->
<script type="text/plain" data-cookie="analytics" async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>

<script>
    window.addEventListener('load', function() {
        window.FeverCookies({
            settings_toggle: '.cookie-button',
            policy: {
                link: '/cookies-policy/',
                name: 'Cookies Policy',
            },
            optional_cookies: {
                analytics: {
                    cookies: ['_ga', '_gid', '_gat', '_gat_gtag_UA_XXXXXXXX_X'],
                    onAccept: function() {
                        // Google Tag Manager Example - Remove unless needed
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-XXXXXXX');

                        // Google Analytics Example - Remove unless needed
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-XXXXXXXX-X', { 'anonymize_ip': true });
                    },
                    onRevoke: function() {
                        // Disable Google Analytics
                        window['ga-disable-UA-XXXXXXXX-X'] = true;
                    }
                },
                marketing: {
                    cookies: ['_fbp', 'fr'], // Facebook Pixel Cookies - Remove unless needed
                    onAccept: function() {
                        // Facebook Pixel Example - Remove unless needed
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', 'FACEBOOK_PIXEL_TRACKING_ID');
                        fbq('track', 'PageView');
                    },
                    onRevoke: function() {
                        // Facebook Pixel Example - Remove unless needed
                        fbq('consent', 'revoke');
                    }
                }
            }
        });
    });
</script>
```

## Licence
ISC License

Copyright (c) 2021 This is Fever

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.