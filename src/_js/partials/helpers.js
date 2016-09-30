(function(window) {
  "use strict";


  window.qs = function(selector, scope) {
    return (scope || window).querySelector(selector);
  }

  window.qsa = function(selector, scope) {
    return (scope || window).querySelectorAll(selector);
  }

  window.$on = function(target, type, func, useCapture) {
    return target.addEventListener(type, func, !!useCapture);
  }

  window.$delegate = function(target, selector, type, handler) {
    function dispatchEvent(event) {
    			var targetElement = event.target;
    			var potentialElements = window.qsa(selector, target);
    			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

    			if (hasMatch) {
    				handler.call(targetElement, event);
    			}
    		}

    		var useCapture = type === 'blur' || type === 'focus';

    		window.$on(target, type, dispatchEvent, useCapture);
  }

  window.$parent = function(element, tagName) {
    if (!element.parentElement) {
      return;
    }
    if (element.parentElement.tagName === tagName.toUpperCase()) {
      return element.parentElement;
    }
    return window.$parent(element.parentElement, tagName);
  }

  NodeList.prototype.forEach = Array.prototype.forEach;

})(window);
