'use strict';

(function ($) {
  var SelfFontScale;
  SelfFontScale = (function () {
    function SelfFontScale(element, options) {
      this.settings = $.extend(true, $.fn.SelfFontScale.defaults, options || {})
      this.$element = $(element)
      this.init()
    }

    SelfFontScale.prototype = {
      init: function () {
        this.current = 0;
        this.texts = this.$element.find(this.settings.selectors.text);
        this.__render();
      },

      __render: function () {
        this.addBtn = $("<div class='" + this.settings.selectors.addBtn + "'>A+</div>")
        this.minusBtn = $("<div class='" + this.settings.selectors.minusBtn + "'>A-</div>")

        this.btnBox = $("<div class='" + this.settings.selectors.btnBox + "'></div>")
          .append(this.addBtn)
          .append(this.minusBtn);


        this.addBtn.click(this.__add.bind(this));
        this.minusBtn.click(this.__minus.bind(this));
        this.$element.append(this.btnBox)
      },

      __add: function () {
        var me = this;
        me.settings.current += me.settings.step;
        if (me.settings.current > me.settings.max) {
          me.settings.current = me.settings.max
          return
        }


        this.texts.css('fontSize', function (index, fontSize) {
          var __fontSize = parseInt(fontSize),
            fontSize = __fontSize + me.settings.step;
          return fontSize

        })

      },

      __minus: function () {
        var me = this
        me.settings.current -= me.settings.step;
        if (me.settings.current < me.settings.min) {
          me.settings.current = me.settings.min
          return
        }

        this.texts.css('fontSize', function (index, fontSize) {
          var __fontSize = parseInt(fontSize),
            fontSize = __fontSize - me.settings.step;
          return fontSize
        })
      }
    }

    return SelfFontScale
  })();

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
      text: '.canScale',
      addBtn: 'textAddBtn',
      minusBtn: 'textMinusBtn',
      btnBox: 'btnBox'
    },
    step: 2,
    max: 10,
    min: 0,
    current: 0
  }
})(jQuery)

$(function(){
  $("body").SelfFontScale()
})

