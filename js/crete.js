$(document).ready(function() {
  $('#show_sign_up').click(function() {
    $(this).toggleClass('is-active');
    $('#top_signup_form').toggleClass('is-active');
  });
  if($('#home_body').size() > 0){
    // on the home page
    $.ajax({
      url: "https://api.forecast.io/forecast/36d5aba954e93fffa29e7df76465fe8b/35.34,25.14",
      dataType: "jsonp",
      data: "units=uk",
      success: function (data) {
        updateTemperature(data);
      }
    });
  }
});

function updateTemperature(data){
  $('#temperature_value').html(Math.ceil(data.currently.temperature)+'&deg;')
};