import { Injectable } from '@angular/core';
var AudioPlaylistService = (function () {
    function AudioPlaylistService() {
        this._currentIndex = -1;
        this._tracklist = [];
    }
    AudioPlaylistService.prototype.add = function (track) {
        return this._tracklist.push(track);
    };
    AudioPlaylistService.prototype.next = function () {
        if (this._currentIndex > -1 && this._currentIndex < this._tracklist.length - 1) {
            this._currentIndex++;
        }
        else if (this._currentIndex === -1 && this._tracklist.length > 0) {
            this._currentIndex = this._tracklist.length - 1;
        }
        return this._currentIndex;
    };
    Object.defineProperty(AudioPlaylistService.prototype, "first", {
        get: function () {
            return this._tracklist.length > 0 && this._tracklist[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlaylistService.prototype, "last", {
        get: function () {
            return this._tracklist.length > 0 && this._tracklist[this._tracklist.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlaylistService.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex;
        },
        set: function (value) {
            this._currentIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlaylistService.prototype, "currentTrack", {
        get: function () {
            return this._tracklist[this._currentIndex];
        },
        enumerable: true,
        configurable: true
    });
    return AudioPlaylistService;
}());
export { AudioPlaylistService };
AudioPlaylistService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AudioPlaylistService.ctorParameters = function () { return []; };
//# sourceMappingURL=ionic-audio-playlist-service.js.map