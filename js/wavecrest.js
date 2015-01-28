var mobile = false,
    valid = true,
    required_contact_fields = ['name','email','message'];


var field_invalid = function(field_name){
  console.log('#contact-'+field_name);
  $('#contact-'+field_name).addClass('invalid').focus();

};

var reset_validation = function(){
  $('#contact_form').find('input,textarea').removeClass('invalid');
  valid = true;
}

var isValidEmailAddress = function(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

$(window).scroll(function () {
    if($("#home__body").size()){
      
      if ($(document).scrollTop() > 150) {
          $("#primary-nav").addClass("active");
      } else {
          $("#primary-nav").removeClass("active");
      }
      
      if ($(document).scrollTop() > 350) {
          $("#nav-cta").addClass("active");
      } else {
          $("#nav-cta").removeClass("active");
      }
    }
});

// called on document ready
$(function(){
  mobile = $('#primary-nav-menu-button').css('display') != 'none';
  
  // ajax contact form submission 
  $("#contact_form").submit(function(e){
    e.preventDefault(); //STOP default action

    reset_validation();
    
    // get data rom the contact form
    var post_data = $(this).serializeArray();
    // reversing the array ensures focus is on the first field
    post_data.reverse();
    
    var form_url = $(this).attr("action");
    var form_method = $(this).attr("method");

    console.log(required_contact_fields);
    $.each(post_data,function(num,field){
      if(required_contact_fields.indexOf(field.name) >= 0 && field.value===""){
        field_invalid(field.name);
        valid = false;
      }
      if(field.name == "email" && !isValidEmailAddress(field.value)){
        field_invalid(field.name);
        valid = false; 
      }
    });

    if(!valid){
      return;
    }
    
    // make an ajax request with the form data to formspree.io
    $.ajax({
        url: form_url, 
        method: form_method,
        data: post_data,
        dataType: "json",
        success: function(res){
          if(res && res.success){
            $('#email-sent-modal').show();
          }else{
            $('#email-failed-modal').show();
          }
        }
    });
  });

  $('.modal__close, .modal__background').click(function() {
    $(this).closest('.modal__wrapper').hide();
  });

  $('#primary-nav-menu-button').on('click',function(e){
    $('#primary-nav-links').toggleClass('menu-active');
    e.preventDefault(); //STOP default action
  });

  $('body').on({
    'touchmove': function(){
      if(mobile){
        $('#primary-nav-links').removeClass('menu-active');
      }
    }
  });

});
