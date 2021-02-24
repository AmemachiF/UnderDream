/*:
 * @target MZ
 * @plugindesc Skip Title Scene
 * @base UD_Utils
 * @author Chang Feng
 */

(()=>{
    'use strict';
    Scene_Title.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        // this.createBackground();
        // this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
    };
    
    Scene_Title.prototype.start = function() {
        Stage.prototype.initialize.call(this);
        DataManager.setupNewGame();
        SceneManager.clearStack();
        $gameSystem.disableSave();
        $gamePlayer.requestMapReload();
        SceneManager.goto(Scene_Map);
    };

    const _Scene_Load__onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        UD_Utils.prototype.erasePicturesRange(0, 0);
        _Scene_Load__onLoadSuccess.apply(this, arguments);
    };
})();
