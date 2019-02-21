import { EventEmitter } from '@angular/core';
import { AudioProvider } from './ionic-audio-providers';
import { ITrackConstraint } from './ionic-audio-interfaces';
/**
 * Generated class for the AudioPlaylistItemDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
export declare class AudioPlaylistItemDirective {
    private _audioProvider;
    track: ITrackConstraint;
    currentTrack: ITrackConstraint;
    currentTrackChange: EventEmitter<ITrackConstraint>;
    private static _currentIndex;
    private static _tracklist;
    private _index;
    constructor(_audioProvider: AudioProvider);
    ngOnInit(): void;
    onClick(): void;
    next(): void;
    readonly currentIndex: number;
    private _play(index?);
}
