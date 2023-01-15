$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev" arial-label="prev"><img src = "icons/left.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next" arial-label="next"><img src = "icons/right.svg" alt="next"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows:false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


    function toggleSlide(link) {
        $(link).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //MODAL 

    $('[data-modal=consultation').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    

    $('.button_mini').each(function(i) {    
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });

    });

   

   function validator(form) {
    $(form).validate({
        rules: {
          name: {
            required:true,
            minlength: 3
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
            name: {
                required:"Пожалуйста введите свое имя",
                minlength: jQuery.validator.format("Имя не должно быть меньше {0}-x символов ")
            },
            phone: "Пожалуйста введите свой номер телефона",
            email: {
              required: "Пожалуйста введите свой почтовый адресс",
              email: " Не действительный почтовый адресс"
            }
          }
      });
   }

   validator('#consultation-form');
   validator('#consultation form');
   validator('#order form');

   $("input[name=phone]").mask("+7(999) 999-99-99");

    //post with ajax
    $('form').submit(function(e) {
        e.preventDefault();
    if(!$(this).valid()) {
            return;
    }

    $(this).find('input').val('');
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn();

        // $.ajax({
        //     type: 'POST',
        //     url: 'mailer/smart.php',
        //     data: $(this).serialize()
        // }).done(function() {
        //     $(this).find('input').val('');
        //     $('#consultation, #order').fadeOut();
        //     $('.overlay, #thanks').fadeIn();

        //     $('form').trigger('reset');
        // });
        return false;
    });
  

    //smoot scroll and pageup

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }

    });

    $("a[href=#up]").click(function () {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top+"px"});
    });

    new WOW().init();
});