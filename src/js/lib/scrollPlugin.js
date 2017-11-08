(function($) {

  var sections = $('.scroll-plugin__container').find('.section');
  var myRe = /[\d]{1,}/;
  var hash;
  var pageNum;
  var topOfSection;
  var id;
  var animationTime;

  function animating(section, time) { //Анимирование слайда
    topOfSection = $(section).offset().top;
    $('html, body').animate({scrollTop: parseInt(topOfSection)}, time);
    $('html, body').clearQueue();
  }

  function isActiveByHash() { // Установка активного круга
    $('.scroll-plugin').find('.pagination').find('a').removeClass('is-active');
    $('.scroll-plugin').find('.pagination').find(`a[href="${hash}"]`).addClass('is-active');
  }

  function pageNumber() { // Определение номера страницы
    hash = window.location.hash;
    pageNum = myRe.exec(hash)[0];
  }

  function pagination() { // пагинация из точек
    for (var i = 0; i < sections.length; i++) {
      $('.pagination').append(`<li><a href="#section${i + 1}"></a></li>`);
      $(sections[i]).attr('id', `section${i + 1}`);
    }
    var paginationHeight = $('.pagination').height();
    $('.pagination').css('top', `calc(50vh - ${paginationHeight/2}px)`);
  }

  var defaults = {
    dots: false,
    slideTime: 500,
    animationStart: null,
    animationEnd: null,
  };

  var methods = {
    init : function( options ) {
      animationTime = options.slideTime;

      var settings = $.extend(defaults, options);

      function animation(section, time) { //Анимация + функции до и после(если есть)
        if (settings.animationStart) {
          settings.animationStart();
        }
        animating(section, time);
        if (settings.animationEnd) {
          setTimeout(settings.animationEnd, animationTime);
        }
      }

      for (var i = 0; i < sections.length; i++) {
        $(sections[i]).attr('id', `section${i + 1}`); // задаем секциям айдишники
      }

      if(settings.dots === true) {
        $('.scroll-plugin').append('<ul class="pagination"></ul>'); // Делаем точки пагинации
        pagination ();
      }

      function moveDown() { // пролистывание вниз
        if (!window.location.hash) {
          animation('#section2', animationTime);
          window.location.hash = '#section2';
          pageNumber();
        } else {
          pageNumber(); //определяем номер страницы
          if (pageNum < sections.length) {
            animation(`#section${+pageNum + 1}`, settings.slideTime);
            window.location.hash = `#section${+pageNum + 1}`;
            pageNumber(); //перезаписать полученный номер страницы для сравнения
          } else {
            return;
          }
        }
      }

      function moveUp() { // пролистывание вверх
        if (!window.location.hash) {
          return;
        } else {
          pageNumber();
          if (pageNum > 1) {
            pageNumber();
            animation(`#section${+pageNum - 1}`, animationTime);
            window.location.hash = `#section${+pageNum - 1}`;
            pageNumber();
          } else {
            return;
          }
        }
      }

      function slide(e) { // определение в какую сторону пролистываем
        e.preventDefault();
        e.stopPropagation();
        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        if (delta >= 0) {
          moveUp();
        } else {
          moveDown();
        }
        isActiveByHash();
      }

      $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', slide); //событие колеса

      $('.scroll-plugin').find('.pagination').find('a').on('click', function() { //переход по клику на круг пагинации
        $('.scroll-plugin').find('.pagination').find('a').removeClass('is-active');
        $(this).addClass('is-active');
        animation($(this).attr('href'), settings.slideTime);
      });

    },
    goto : function(page) { //метод для перехода по номеру секции
      animating(`#section${page}`, animationTime);
      window.location.hash = `#section${page}`;
      id = window.location.hash;
      pageNumber();
      isActiveByHash();
    }
  };

  $.fn.scrollPlugin = function(method) { //определение метода
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' + method + ' не существует для scrollPlugin' );
    }

  };
})(jQuery);
