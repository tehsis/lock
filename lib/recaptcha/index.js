var bind = require('../bind');
var jsonp = require('jsonp');

module.exports = Recaptcha;

function Recaptcha(el, options, onLoadCallback) {
  this.el = el;
  this.options = options;
  this.onloadcb = onLoadCallback;
  
  // Preserve instance for jsonp
  Recaptcha.instance = this; // Should add support for more than one instance?
  this._loadRecaptcha();
}

Recaptcha.prototype.show = function() {

};

Recaptcha.prototype.onVerify = function(recaptcha_token) {
  // Send token to server. Probably using an event.
  console.log(recaptcha_token);
};

Recaptcha.prototype._loadRecaptcha = function() {
  var self = this;
  jsonp('https://www.google.com/recaptcha/api.js?render=explicit', {
    param: 'onload'
  }, function() {
    self._onload();
  });

  /*
  // This was copied from options-manager, we probably need to make an extra module for this
  var script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?onload=_onRecaptchaload&render=explicit';

  // Insert script in DOM head
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);


  // Handle load and error for client config
  //script.addEventListener('load', bind(this.onRecaptchaloadsuccess, this));
  //script.addEventListener('error', bind(this.onRecaptchaloaderror, this));
  */
};

Recaptcha.prototype._onload = function () {
  var self = this;
  grecaptcha.render(self.el, {
    'sitekey' : self.options.recaptcha.key,
    'callback' : self.onVerify.bind(this),
    'theme' : self.options.recaptcha.theme
  });

  self.onloadcb();
};

Recaptcha.prototype.onRecaptchaerror = function() {
  // handle error
};
