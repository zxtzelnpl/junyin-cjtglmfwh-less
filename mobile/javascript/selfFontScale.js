'use strict';

(function ($) {
  var SelfFontScale = (function () {
    function SelfFontScale(element, options) {
      this.settings = $.extend(true, $.fn.SelfFontScale.defaults, options || {})
      this.$element = $(element)
      this.init()
    }

    SelfFontScale.prototype = {
      init: function () {
        console.log('init')
        this.texts = this.$element.find(this.settings.selectors.text);
        this.__render();
      },

      __render: function () {
        console.log('__render')
        this.addBtn = $("<div class='textAddBtn'>A+</div>").css({})
        this.minusBtn = $("<div class='textMinusBtn'>A-</div>").css({})

        this.btnBox = $("<div class='btnBox'></div>")
          .append(this.addBtn)
          .append(this.minusBtn)
          .css({})


        this.addBtn.click(this.__add.bind(this))
        this.minusBtn.click(this.__minus.bind(this))
        this.$element.append(this.btnBox)
      },

      __add: function () {
        var me = this;
        me.settings.current += me.settings.step;
        if(me.settings.current>me.settings.max){
          me.settings.current = me.settings.max
        }


        this.texts.css('fontSize',function(index,fontSize){
          var __fontSize = parseInt(fontSize),
            fontSize = __fontSize + me.settings.current;
          console.log(me.settings.current)
          console.log(fontSize)
          return fontSize

        })

      },

      __minus: function () {
        this.current -= this.step;
        if(this.current<this.min){
          this.current = this.min
        }

        this.texts.css('fontSize',function(preCss,nextCss){
          console.log(preCss)
        })
      }
    }

    return SelfFontScale
  })()

  $.fn.SelfFontScale = function (options) {
    return this.each(function () {
      var me = $(this),
        instance = me.data('SelfFontScale');
      if (!instance) {
        me.data('SelfFontScale', (instance = new SelfFontScale(me, options)))
      }
    })
  }

  $.fn.SelfFontScale.defaults = {
    selectors: {
      text: '.text',
      addBtn: '.textAddBtn',
      minusBtn: '.textMinusBtn',
      btnBox: '.btnBox'
    },
    step: 2,
    max: 10,
    min: 0,
    current: 0
  }

  $("body").SelfFontScale()

})(jQuery)

