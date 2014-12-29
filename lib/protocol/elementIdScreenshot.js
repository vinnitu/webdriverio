/**
 *
 * Determine an element's size in pixels. The size will be returned as a JSON object
 * with width and height properties.
 *
 * @param {String} ID ID of a WebElement JSON object to route the command to
 * @return png base64
 *
 * @see  https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/screenshot
 * @type protocol
 *
 */

var ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function elementIdScreenshot (id) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    if(typeof id !== 'string' && typeof id !== 'number') {
        return callback(new ErrorHandler.ProtocolError('number or type of arguments don\'t agree with elementIdSize protocol command'));
    }

    this.requestHandler.create(
        '/session/:sessionId/element/:id/screenshot'.replace(/:id/gi, id),
        callback
    );

};
