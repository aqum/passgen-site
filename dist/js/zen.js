$(function() {
  var btn = $('#generate-btn');
  var output = $('#generate-output');
  var strength_output = $('#strength');

  var length_input = $('#generate-length');
  var pronounceable_input = $('#generate-pronounceable');

  btn.on('click', function() {
    var length = length_input.val();
    var is_pronounceable = pronounceable_input.is(":checked");

    var password = generatePassword(length, is_pronounceable);
    var strength = zxcvbn(password);

    output.val(password);
    strenth_output.text(strength.crack_time_display);
  });
});
