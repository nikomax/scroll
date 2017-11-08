import sayHello from './lib/sayHello.js';
import $ from 'jquery';
import './lib/scrollPlugin';

$(document).ready(function() {
  $('.scroll-plugin').scrollPlugin({
    dots: true,
    slideTime: 1000,
    animationStart: function() {
      alert('before animation start');
    },
    animationEnd: function() {
      alert('after animation end');
    }
  });
  $('.btn').on('click', function() {
    $(this).scrollPlugin('goto', '5');
  });

});

sayHello();
