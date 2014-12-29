/**
 *
 * Get the width and height for an DOM-element based given selector.
 *
 * <example>
    :getElementScreenshot.js
    client
        .getElementScreenshot('.header-logo-wordmark', function(err, result) {
            console.log(result.value) // outputs: base64 png
        })
 * </example>
 *
 * @param   {String} selector element with requested screenshot
 * @returns {Object}          requested element screenshot
 *
 * @uses protocol/elements, protocol/elementIdScreenshot
 * @type property
 *
 */

var async = require('async'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function getElementScreenshot (selector) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    /*!
     * parameter check
     */
    if(typeof selector !== 'string') {
        return callback(new ErrorHandler.CommandError('number or type of arguments don\'t agree with getElementScreenshot command'));
    }

    var self = this,
        response = {};

    async.waterfall([
        function(cb) {
            self.elements(selector, cb);
        },
        function(res, cb) {
            response.elements = res;
            response.elementIdScreenshot = [];

            if(res.value.length === 0) {
                // throw NoSuchElement error if no element was found
                return callback(new ErrorHandler(7));
            }

            async.eachSeries(res.value, function(val, seriesCallback) {
                self.elementIdScreenshot(val.ELEMENT, function(err,res) {
                    response.elementIdScreenshot.push(res);
                    seriesCallback(err);
                });
            }, cb);
        }
    ], function(err) {
        var value = null;

        if (response.elementIdScreenshot && response.elementIdScreenshot.length === 1) {

            value = response.elementIdScreenshot[0];

        } else if(response.elementIdScreenshot && response.elementIdScreenshot.length > 1) {

            value = response.elementIdScreenshot.map(function(res) {
                return res;
            });

        }

        callback(err, value, response);

    });
};