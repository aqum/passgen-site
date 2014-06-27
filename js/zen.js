$(function() {
  var btn = $('#generate-btn');
  var output = $('#generate-output');
  var strength_output = $('#password-strength-output');
  var default_length = 20;

  var length_input = $('#password-length');
  var pronounceable_input = $('#generate-pronounceable');

  setTimeout(function() {
    fillPasswordInput(default_length);
    output.select();
  }, 20);

  var length_slider = $('#password-length');
  length_slider.slider({
    value: default_length,
    min: 6,
    max: 40,
    step: 1,
    create: function() {
      var label = $('<span/>').text(length_slider.slider('value'));
      label.addClass('generator-slider-label');
      length_slider.find('.ui-slider-handle').html(label);
    },
    slide: function(event, ui) {
      fillPasswordInput(ui.value);

      length_slider.find('.generator-slider-label').text(length_slider.slider('value'));
    }
  });

  pronounceable_input.on('change', function() {
    fillPasswordInput(length_slider.slider('value'));
  });

  output.on('input', function() {
    var password = output.val();
    var strength = zxcvbn(password);
    var human_crack_time = translateCrackTime(strength.crack_time_display);

    $('body').attr('class', 'strength-' + strength.score);
    strength_output.text(human_crack_time);
  });
  output.on('click', function() {
    $(this).select();
  });


  function fillPasswordInput(length) {
    var is_pronounceable = pronounceable_input.is(":checked");

    var password = generatePassword(length, is_pronounceable);

    if (is_pronounceable) {
      password = separateString(password, '-');
    }

    output.val(password).trigger('input');
  }
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

// we have pretty difficult language here in Poland (:
function translateCrackTime(sentence) {
  var number = sentence.match(/\d+/);
  var word = sentence.replace(number, '').trim();

  var translation;
  switch (word) {
    case 'instant':
      translation = 'migiem';
      break;
    case 'minute':
    case 'minutes':
      if (number == 1)
        translation = 'minuta';
      else if (number == 2)
        translation = 'minuty';
      else if ($.inArray(number, [3,4]) >= 0)
        translation = 'minuty';
      else
        translation = 'minut';
      break;
    case 'hour':
    case 'hours':
      if (number == 1)
        translation = 'godzina';
      else if ($.inArray(number, [2,3,4]) >= 0)
        translation = 'godziny';
      else
        translation = 'godzin';
      break;
    case 'day':
    case 'days':
      if (number == 1)
        translation = 'dzień';
      else
        translation = 'dni';
      break;
    case 'month':
    case 'months':
      if (number == 1)
        translation = 'miesiąc';
      else if ($.inArray(number, [2,3,4]) >= 0)
        translation = 'miesiące';
      else
        translation = 'miesięcy';
      break;
    case 'year':
    case 'years':
      if (number == 1)
        translation = 'rok';
      else if ($.inArray(number, [2,3,4]) >= 0)
        translation = 'lata';
      else
        translation = 'lat';
      break;
    case 'centuries':
      translation = 'wieki';
      break;
    default:
      translation = word;
      break;
  }

  return sentence.replace(word, translation);
}