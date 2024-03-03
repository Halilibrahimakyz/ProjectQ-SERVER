class ErrorResponse extends Error {
  constructor(error, language = 'EN', customMessage) {
    super((language === 'TR' ? error.messageTR : error.messageEN) + ' ' + (customMessage || ''));
    this.statusCode = error.statusCode;
    this.priority = error.priority;
    this.code = error.code || 0;
    Error.captureStackTrace(this, ErrorResponse);
  }
}

/*class ErrorResponse {
 
  constructor(blendedError, customMessage) {
    this.message = blendedError.message + ' ' + (customMessage || '')
    this.statusCode = blendedError.statusCode;
    this.priority = blendedError.priority;
    this.code = blendedError.code || 0;
  }
}
*/

if (!('toJSON' in Error.prototype))
  Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
      var alt = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key];
      }, this);

      return alt;
    },
    configurable: true,
    writable: true,
  });

module.exports = ErrorResponse;
