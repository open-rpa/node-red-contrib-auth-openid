"# node-red-contrib-auth-openid" 

Install using npm
```
npm i node-red-contrib-auth-openid
```

declare module using either
```javascript
var openidauth = require("node-red-contrib-auth-openid");
```
or using typescript
```typescript
import * as openidauth from "node-red-contrib-auth-openid";
```
then initilize 
```typescript
settings.adminAuth = new openidauth.noderedcontribauthopenid("http://localhost:1880/", "blahblah.apps.googleusercontent.com", "secret", 
(profile:string | any, done:any)=> {
    profile.permissions = "read";
    profile.permissions = "*";
    done(profile);
});
```