'use strict';

(function($){
  var InLoading;
  InLoading = (function(){
    function InLoading(element,options){
      this.settings = $.extend(true, $.fn.InLoading.defaults, options || {})
      this.$element = $(element)
      this.init()
    }

    InLoading.prototype = {
      init:function(){
        this.loadingDom = $("<div class='inLoading on'><div class='inLoadingImg'></div></div>");
        this.$element.append(this.loadingDom);
      },

      show:function(){
        this.loadingDom.addClass('on')
      },

      hide:function(){
        this.loadingDom.removeClass('on')
      }
    }

    return InLoading
  })()


  $.fn.InLoading = function(options){
    return this.each(function(){
      var me = $(this),
        instance = me.data('InLoading');
      if(!instance){
        me.data('InLoading',(instance = new InLoading(me,options)))
      }
    })
  }

  $.fn.InLoading.defaults={}
})(jQuery)