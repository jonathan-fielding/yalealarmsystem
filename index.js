const fetch = require('node-fetch');
const setCookie = require('set-cookie-parser');

const urls = {
    login: 'https://www.yalehomesystem.co.uk/homeportal/api/login/check_login',
    status: 'https://www.yalehomesystem.co.uk/homeportal/api/panel/get_panel_mode',
    armAway: 'https://www.yalehomesystem.co.uk/homeportal/api/panel/set_panel_mode?area=1&mode=arm',
    armHome: 'https://www.yalehomesystem.co.uk/homeportal/api/panel/set_panel_mode?area=1&mode=home',
};

function getSessionCookie(username, password) {
    let sessionCookie = null;

    return fetch(urls.login, { 
        method: 'POST', 
        body: `id=${encodeURIComponent(username)}&password=${password}&rememberme=on&notify_id=&reg_id=Name`,
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
    })
    .then((res) => {
        sessionCookie = res.headers._headers['set-cookie'];
    
        return res.json();
    }).then(json => {
        if (json.result === '0') {
            return Promise.reject('Incorrect account details');
        }
        else {
            return sessionCookie[0];
        }
    })
}

function getStatus(sessionCookie) {
    return fetch(urls.status, { 
        method: 'POST', 
        headers: {
          'Cookie': sessionCookie,
        },
    }).then(res => res.text()).then(textResponse => {
        // When initially writing this code I found if cookie payload 
        // was invalid I got this text response so I added this code to
        // handle this, shouldn't happen but good to have an error message
        // for this use case
        if (textResponse === 'Disallowed Key Characters.') {
            return Promise.reject('Invalid request');
        }
        else {
            try {
                // Hopefully if we got to this point we can parse the json
                const json = JSON.parse(textResponse);

                if (json.result === '0') {
                    return Promise.reject('Unable to get status');
                }
                else {
                    return json;
                }
            } catch (error) {
                // If you get this error message I likely have not handled 
                // a error state that I wasnt aware of
                return Promise.reject('Unable to parse response');
            }
        }
    });
}

module.exports = {
    getSessionCookie,
    getStatus,
}