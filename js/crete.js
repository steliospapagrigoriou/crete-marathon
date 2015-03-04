$(document).ready(function() {  
  //sign-up form
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

  // display days left until marathon
  $('.js-days-left').html(calculateDaysLeft());
});

var day = moment();

function calculateDaysLeft(){
  var today = moment();
  var day_of_marathon = moment([2015,9,15]);
  return day_of_marathon.diff(today, 'day');
}

function updateTemperature(data){
  $('#weather_temperature').html(Math.ceil(data.currently.temperature)+'&deg;');
  $('#weather_icon').attr('src','/img/icons-weather/'+data.currently.icon+'.png');

  for(var i=1; i <= 4; i++){
    day.add(1, 'days')
    $('#weather_forecast').append('<p>'+day.format('ddd')+' <img class="weather-icon__forecast" src="/img/icons-weather/'+data.daily.data[i].icon+'.png">'+Math.ceil(data.daily.data[i].temperatureMax)+'&deg;</p>');
  }
};
