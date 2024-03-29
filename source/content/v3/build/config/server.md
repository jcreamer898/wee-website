---
name: Server
---

When Wee is running and serving your site through the proxy, you can chose to have it mirror actions between connected browsers. That means if you have a browser open to your proxy URL on perhaps a mobile device on the same network, and your local development device, when you scroll, click, or take an action on one browser, it will be replicated in the other.

```javascript
"ghostMode": true
```

---code|label:Host---

If you need to override the hostname do it here. By default your current public IP will be used.

```javascript
"host": "auto"
```

---code|label:Port---

If for some reason you are having a port conflict, you can update the port here.

```javascript
"port": 9000
```

---code|label:Inject---

Add paths to the injection array to dynamically add them to your pages requested through the proxy server.

```javascript
"inject": [
	"/source/js/custom/testing.js"
]
```

---code|label:Reload---

This allows you to enable or disable reloading whenever CSS, JavaScript, or static files change. It also allows  specifying certain paths and extensions to watch for efficiency.

```javascript
"reload": {
	"enable": true,
	"watch": {
		"root": true,
		"paths": [

		],
		"extensions": [
			"html"
		]
	}
}
```

---code|label:Tasks---

With the `wee run:local` task, Wee needs to know your local server address. It then uses a proxy to sit between your browser and the development server to inject changes.

With `wee run:static` you can set whether to use HTTPS.

```javascript
"tasks": {
	"local": {
		"https": true,
		"proxy": "https://wee.dev"
	},
	"static": {
		"https": true
	}
}
```