 function switchtaps(x,y,z){
            $('.'+x+' .'+y+' a').each(function(index, el) {
              $(this).hover(function() {
                $('.'+x+' .'+y+' a').removeClass('hover');
                $(this).addClass('hover');
                $("."+x+" ."+z).hide();
                $("."+x+" ."+z).eq(index).show();
              });
            });
          }
          jQuery(document).ready(function($) {
            switchtaps("tab_box_wid","tit","tab_box_cont");
          });