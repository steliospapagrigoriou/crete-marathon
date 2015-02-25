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

var day = moment();

function updateTemperature(data){
  console.log(data);
  $('#weather_temperature').html(Math.ceil(data.currently.temperature)+'&deg;');
  $('#weather_icon').attr('src','/img/icons-weather/'+data.currently.icon+'.png');

  for(var i=1; i <= 4; i++){
    day.add(1, 'days')
    $('#weather_forecast').append('<p>'+day.format('dddd')+' <img class="weather-icon__forecast" src="/img/icons-weather/'+data.daily.data[i].icon+'.png">'+Math.ceil(data.daily.data[i].temperatureMax)+'&deg;</p>');
  }
};