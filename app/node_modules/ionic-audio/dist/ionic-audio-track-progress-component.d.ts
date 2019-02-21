import { IAudioTrack } from './ionic-audio-interfaces';
import { OnChanges, SimpleChanges, DoCheck, EventEmitter } from '@angular/core';
/**
 * # ```<audio-track-progress>```
 *
 * Renders a timer component displaying track progress and duration
 *
 * ## Usage
 * ````
 * <audio-track-progress [audioTrack]="track"></audio-track-progress>
 * ````
 *
 * @element audio-track-progress
 * @parents audio-track
 * @export
 * @class AudioTrackProgressComponent
 */
export declare class AudioTrackProgressComponent {
    /**
     * The AudioTrackComponent parent instance created by ```<audio-track>```
     *
     * @property @Input() audioTrack
     * @type {IAudioTrack}
     */
    audioTrack: IAudioTrack;
}
/**
 * # ```<audio-track-progress-bar>```
 *
 * Renders a progress bar with optional timer, duration and progress indicator
 *
 * ## Usage
 * ````
 *  <audio-track-progress-bar duration progress [audioTrack]="audio"></audio-track-progress-bar>
 * ````
 *
 * @element audio-track-progress-bar
 * @parents audio-track
 * @export
 * @class AudioTrackProgressBarComponent
 */
export declare class AudioTrackProgressBarComponent implements OnChanges, DoCheck {
    /**
     * The AudioTrackComponent parent instance created by ```<audio-track>```
     *
     * @property @Input() audioTrack
     * @type {IAudioTrack}
     */
    audioTrack: IAudioTrack;
    onFinish: EventEmitter<any>;
    private _showDuration;
    private _showProgress;
    constructor();
    /**
     * Input property indicating whether to display track progress
     *
     * @property @Input() progress
     * @type {boolean}
     */
    progress: boolean;
    /**
     * Input property indicating whether to display track duration
     *
     * @property @Input() duration
     * @type {boolean}
     */
    duration: boolean;
    seekTo(value: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
}
