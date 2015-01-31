describe('Recaptcha', function() {
  it('should load the recaptcha script', function(done) {
    var $recaptcha_element = $('<div class="recaptcha-container">');
    var recaptcha = new Recaptcha($recaptcha_element[0], {
        key: '6LeCEAETAAAAACx-QSVnbOrTvF6S2NaK1bjkslhJ',
        theme: 'dark'
    }, function() {
        // Detect when when recaptcha was rendered
        expect($recaptcha_element.children('iframe')).to.not.be(0);
        done();
    });
  });
});

