import { ITrackConstraint } from './ionic-audio-interfaces';
export declare class AudioPlaylistService {
    private _currentIndex;
    private _tracklist;
    constructor();
    add(track: ITrackConstraint): number;
    next(): number;
    readonly first: ITrackConstraint;
    readonly last: ITrackConstraint;
    currentIndex: number;
    readonly currentTrack: ITrackConstraint;
}
