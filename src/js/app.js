import sayHello from './lib/sayHello.js';
import $ from 'jquery';
import './lib/scrollPlugin';

$(document).ready(function() {
  $('.scroll-plugin').scrollPlugin({
    dots: true,
    // slideTime: 1000
  });
  // $('.scroll-plugin').scrollPlugin('goto', '5');
  $('.btn').on('click', function() {
    $(this).scrollPlugin('goto', '5');
  });

});

sayHello();
