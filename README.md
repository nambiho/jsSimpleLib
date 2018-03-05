# Simple javascript library
started : 2017.12.28
now : It is still incomplete. It will be updated continuously.



# object
~~~~
function simplelib (options) {
  if (this === undefined) return null;
  this.init(options);
}
	
simplelib.prototype = {
  version : version,
  constructor : simplelib,
  options : null,
  noop : noop,
  bInfo : bInfo,
  task : task,
  loader : loader,
  utils : utils,
  init : function (options) {
    this.options = options;
  }
};

var utils = {
  isObject : isObject,
  isNative : isNative,
  isArray : isArray,
  isFunction  : isFunction,
  isPlain : isPlain,
  isString : isString,
  isNull : isNull,
  isUndefined : isUndefined,
  isDom : isDom,
  isFalse : isFalse,
  isJSON : isJSON,
  isJsonString : isJsonString,
  trim : trim,
  getElementById : getElementById,
  getElementByClassName : getElementByClassName,
  getElementByTagName : getElementByTagName,
  getElementName : getElementName,
  query : query,
  queryall : queryall,
  copy : copy,
  style : style,
  merge : merge,
  createElement : createElement,
  addEvent : addEvent,
  trigger : trigger,
  getUrl : getUrl,
  object : object,
  noop : noop,
  strPattern : strPattern
};
~~~~
