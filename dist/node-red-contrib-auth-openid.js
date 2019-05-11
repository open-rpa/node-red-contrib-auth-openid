"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openidStrategy = require("passport-openid-connect");
// tslint:disable-next-line: class-name
class openidauthstrategyoptions {
    constructor() {
        this.issuerHost = "";
        this.client_id = "";
        this.client_secret = "";
        this.redirect_uri = "auth/strategy/callback/";
        this.scope = "groups openid userid email profile";
    }
}
exports.openidauthstrategyoptions = openidauthstrategyoptions;
// tslint:disable-next-line: class-name
class openidauthstrategy {
    constructor() {
        this.name = "passport-openid-connect";
        this.label = "Sign in with openID";
        this.icon = "fa-openid";
        this.strategy = openidStrategy.Strategy;
        this.options = new openidauthstrategyoptions();
    }
}
exports.openidauthstrategy = openidauthstrategy;
// tslint:disable-next-line: class-name
class noderedcontribauthopenid {
    constructor(baseURL, client_id, client_secret, customverify = null) {
        this.type = "strategy";
        this.authenticate = null;
        this.users = null;
        this.strategy = new openidauthstrategy();
        this._users = {};
        this.strategy.options.redirect_uri = baseURL + "auth/strategy/callback/";
        this.strategy.options.client_id = client_id;
        this.strategy.options.client_secret = client_secret;
        this.customverify = customverify;
        this.strategy.options.verify = (this.verify).bind(this);
        this.authenticate = (this._authenticate).bind(this);
        this.users = (this.fn_users).bind(this);
    }
    verify(token, tokenSecret, profile, done) {
        if (profile.emails) {
            var email = profile.emails[0];
            profile.username = email.value;
        }
        if (this.customverify !== null && this.customverify !== undefined) {
            this.customverify(profile, (newprofile) => {
                this._users[newprofile.username] = newprofile;
                done(null, newprofile);
            });
        }
        else {
            this._users[profile.username] = profile;
            done(null, profile);
        }
    }
    async _authenticate(profile, arg2) {
        var username = profile;
        if (profile.emails) {
            var email = profile.emails[0];
            profile.username = email.value;
        }
        if (profile.username) {
            username = profile.username;
        }
        return this.users(username);
    }
    async fn_users(username) {
        var user = this._users[username];
        return user;
    }
}
exports.noderedcontribauthopenid = noderedcontribauthopenid;
//# sourceMappingURL=node-red-contrib-auth-openid.js.map