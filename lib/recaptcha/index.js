var bind = require('../bind');
var jsonp = require('jsonp');

module.exports = Recaptcha;

var script_url = 'https://www.google.com/recaptcha/api.js'

var noop = function() {};

function Recaptcha(el, options, onLoadCallback) {
  this.el = el;
  this.options = options;
  this.onloadcb = onLoadCallback || noop;
  this.verification = null;
  
  this._loadRecaptcha();
}

Recaptcha.prototype.onVerify = function(recaptcha_token) {
  this.verification = {
    token: recaptcha_token
  };
};

Recaptcha.prototype._loadRecaptcha = function() {
  var self = this;
  if (Recaptcha.loaded) {
    return this._onload();
  } else {
    jsonp(script_url + '?render=explicit', {
      param: 'onload'
    }, function() {
      self._onload();
    }); 
  }
};

Recaptcha.prototype._onload = function () {
  var self = this;
  Recaptcha.loaded = true; // the lib has been loaded
  this.verification = null;
  if (this.widget) {
    grecaptcha.reset(this.widget);
  } else {
    this.widget = grecaptcha.render(self.el, {
      sitekey: self.options.key,
      callback: self.onVerify.bind(this),
      theme: self.options.theme,
      callback: self.onVerify 
    }); 

    self.onloadcb();
  }
};

Recaptcha.prototype.onRecaptchaerror = function() {
  // handle error
};
