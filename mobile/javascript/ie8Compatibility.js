'use strict'

!function(){
  if(typeof String.prototype.trim !== "function"){
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
}()