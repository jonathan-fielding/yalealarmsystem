# Yale Alarm System Node.js API Wrapper

This Node.js module wraps the undocumented API used to control the [Yale Smart Alarm System](https://www.yale.co.uk/en/yale/couk/products/smart-living/smart-home-alarms/smart-home-alarm-and-view-kit/).

## Installation

`npm i yalealarmsystem --save`

## Usage

### getSessionCookie

`getSessionCookie` will retrieve a token to use for the API, it takes two arguments, your username and password used to login to the App of your alarm system.

```
getSessionCookie('username', 'password');
```

### getStatus

`getStatus` will retrieve the status of the alarm system, it returns the response the API returns.

```
getStatus('access_token');
```

As the example shows you will need to pass the sessionCookie into the getStatus method call, as this module is promise based you can simply chain the getStatus method call after your getSessionCookie call.

```
getSessionCookie('username', 'password').then(getStatus);
```

### setStatus

`setStatus` will set the status of the alarm system. It takes two parameters:

* Access Token - This is retrieved using `getSessionCookie`
* Mode - The mode can either be 'arm', 'home' or 'disarm'

```
setStatus('access_token', 'arm');
```

As the example shows you will need to pass the sessionCookie into the setStatus method call, as this module is promise based you can simply chain the setStatus method call after your getSessionCookie call.

```
getSessionCookie('username', 'password').then((access_token) => {
    setStatus(access_token, 'arm');
});
```

## License

Copyright 2019 Jonathan Fielding, Jack Mellor & Adam Green

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

License: MIT (http://www.opensource.org/licenses/mit-license.php)
