/*:
 * @target MZ
 * @plugindesc Utils
 * @base PluginCommonBase
 * @author Chang Feng
 * 
 * @command ERASE_PICTURES_RANGE
 * @text 批量消除图片
 * @desc 批量消除图片
 *
 * @arg pictureIdFrom
 * @text 图片起始编号
 * @desc 图片起始编号
 * @default 0
 * @type number
 * 
 * @arg pictureIdTo
 * @text 图片终止编号
 * @desc 图片终止编号
 * @default 0
 * @type number
 * 
 * @command REMOVE_PICTURE_EVENT_RANGE
 * @text 批量消除图片事件
 * @desc 批量消除图片事件
 *
 * @arg pictureIdFrom
 * @text 图片起始编号
 * @desc 图片起始编号
 * @default 0
 * @type number
 * 
 * @arg pictureIdTo
 * @text 图片终止编号
 * @desc 图片终止编号
 * @default 0
 * @type number
 * 
 */

class UD_Utils {
    constructor() {
        throw new Error("This is a static class");
    }
    erasePicturesRange (from, to) {
        if (from <= 0)
            from = 1;
        if (to <= 0)
            to = $gameScreen.maxPictures();
        if (from > to)
            to = from;
        const real_from = Math.max(from, 1);
        const real_to = Math.min(to, $gameScreen.maxPictures());
        for (let i = real_from; i <= real_to; ++i) {
            $gameScreen.erasePicture(i);
        }
    }
    erasePicturesEventRange (from, to) {
        if (from <= 0)
            from = 1;
        if (to <= 0)
            to = $gameScreen.maxPictures();
        if (from > to)
            to = from;
        const real_from = Math.max(from, 1);
        const real_to = Math.min(to, $gameScreen.maxPictures());
        for (let i = real_from; i <= real_to; ++i) {
            $gameScreen.removePictureEvent(i);
        }
    }
    zoomPicture (pictureId, zoom, duration) {
        const pic = $gameScreen.picture(pictureId);
        $gameScreen.movePicture(pictureId, pic.origin(), pic.x(), pic.y(), zoom, zoom, pic.opacity(), pic.blendMode(), duration, 0);
    }
}

(() => {
    'use strict';
    const script = document.currentScript;
    PluginManagerEx.registerCommand(script, 'ERASE_PICTURES_RANGE', args => {
        UD_Utils.prototype.erasePicturesRange(args.pictureIdFrom, args.pictureIdTo)
    })

    PluginManagerEx.registerCommand(script, 'REMOVE_PICTURE_EVENT_RANGE', args => {
        UD_Utils.prototype.erasePicturesEventRange(args.pictureIdFrom, args.pictureIdTo)
    });

    const _PluginManagerEx_convertEscapeCharactersEx      = PluginManagerEx.convertEscapeCharactersEx;
    PluginManagerEx.convertEscapeCharactersEx = function(text, data = null) {
        text = _PluginManagerEx_convertEscapeCharactersEx.call(this, text, data);
        text = text.replace(/\x1bCV\[(\d+)]/gi, function() {
            let color_code = $gameVariables.value(parseInt(arguments[1]) + 20);
            return `\x1bC[${color_code}]`;
        }.bind(this));
        return text;
    };
})();
