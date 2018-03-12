(function($){
  'use strict'

  /*ZxtVideo的构造函数*/
  var ZxtVideo = (function(){
    function ZxtVideo($element,options){
      this.settings = $.extend(true,$.fn.ZxtVideo.defaults,options||{})
      this.element = $element
      this.init()
    }

    ZxtVideo.prototype = {
      init:function(){
        var url = this.element.data(this.settings.dataSrc);
        if(typeof url !== 'undefined'){
          this.videoBox = this.video(url)
          this.element.append(this.videoBox).addClass(this.settings.activeClass)
        }
        else{
          console.warn('没有拿到音频的url')
        }
      },
      video:function(url){
        var videoBox = $("<video controls='false' >" +
          "<source src='"+url+"'/>" +
          "您的设备暂不支持此视频" +
          "</video >")

        return videoBox;
      }
    }

    return ZxtVideo
  })();

  /*ZxtVideo绑定jQuery生成实例*/
  $.fn.ZxtVideo = function(options){
    return this.each(function(){
      var me = $(this),
        instance = me.data('ZxtVideo');
      if(!instance){
        me.data('ZxtVideo',(instance = new ZxtVideo(me,options)))
      }
    })
  }

  /*ZxtVideo默认设定*/
  $.fn.ZxtVideo.defaults={
    activeClass:'on',
    dataSrc:'videosrc'
  }


  /**
   * Object{
       *    activeClass 如果有资源则显示，如果没有资源则隐藏
       *    dataSrc 绑定的资源的data的标签，全小写
       *    playClass 播放的样式
       *    btn 按钮的selector,用于样式改变
       * }
   */
  /*ZxtAudio的构造函数*/
  var ZxtAudio = (function(){
    function ZxtAudio($element,options){
      this.settings = $.extend(true,$.fn.ZxtVideo.defaults,options||{})
      this.element = $element
      this.init()
    }

    ZxtAudio.prototype = {
      init:function(){
        var url = this.element.data(this.settings.dataSrc);
        if(typeof url !== 'undefined'){
          this.audioBox = this.audio(url)
          this.element.append(this.audioBox).addClass(this.settings.activeClass)
          this.control()
        }
        else{
          console.warn('没有拿到音频的url')
        }
      },

      audio:function(url){
        var videoBox = $("<audio >" +
          "<source src='"+url+"'/>" +
          "您的设备暂不支持此音频" +
          "</audio >")

        return videoBox;
      },

      control:function(){
        var me=this;
        var btn = this.element.find(this.settings.btn)
        var audio = this.audioBox[0];
        this.element.click(function(){
          if(audio.paused){
            audio.play()
            btn.addClass(me.settings.playClass)
          }
          else{
            audio.pause()
            btn.removeClass(me.settings.playClass)
          }
        })
      }
    }

    return ZxtAudio
  })();

  /*ZxtAudio绑定jQuery生成实例*/
  $.fn.ZxtAudio = function(options){
    return this.each(function(){
      var me = $(this),
        instance = me.data('ZxtAudio');
      if(!instance){
        me.data('ZxtAudio',(instance = new ZxtAudio(me,options)))
      }
    })
  }

  /*ZxtAudio默认设定*/
  $.fn.ZxtAudio.default={
    activeClass:'on',
    dataSrc:'audiosrc',
    playClass:'play',
    btn:'.btn'
  }
})(jQuery);