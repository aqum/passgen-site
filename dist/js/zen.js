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

    if (is_pronounceable) {
      password = separateString(password, '-');
    }

    output.val(password);
    strength_output.text(strength.crack_time_display);
  });

  setTimeout(function() {
    $('#generate-btn').trigger('click');
  }, 20);
});

function separateString(string, separator) {
  string.split('');
  var output = [];

  // randomize position of first separator
  var split_index = randomNumber(5, 2);

  for (var i = 0; i < string.length; i++) {
    output.push(string[i]);

    // add separator and increment index for next position
    if (i == split_index && i != string.length-1) {
      output.push(separator);
      split_index += randomNumber(5, 2);
    }
  }

  return output.join('');
}

function randomNumber(max, min) {
  return (Math.floor(Math.random() * 100) % (max - min)) + min;
}
