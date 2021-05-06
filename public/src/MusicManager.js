class MusicManager {
    static _internalPlayTime = 0;
    static _msPerBeat = 0;
    static _bpmPlayTime = 0;

    static _musicData = null;
    static _nextEventIndex = 0;

    static _nextBeatCount = 1;

    static _musicDuration = 0;

    static update(time, dt) {
        const deltaTime = time - MusicManager._internalPlayTime;
        while (MusicManager._getCurrentEvent() && deltaTime >= MusicManager._getCurrentEvent()[0]) {
            MusicManager._onEvent(MusicManager._getCurrentEvent());

            MusicManager._nextEventIndex++;
        }

        if (MusicManager._bpmPlayTime) {
            const beatCount = Math.ceil(MusicManager.getBeatCountFloat(time));
            while (beatCount >= MusicManager._nextBeatCount) {
                MusicManager._nextBeatCount++;

                if (MusicManager.isActive(time)) {
                    Camera.addDensityVelocity();
                }
            }
        }
    }

    static play(labels) {
        const musicData = labels.split('\n');
        for (let i = 0; i < musicData.length; i++) {
            if (musicData[i].trim() === '') {
                musicData.splice(i, 1);
                i--;
                continue;
            }

            musicData[i] = musicData[i].split('\t');
            musicData[i][0] = Number.parseFloat(musicData[i][0]) * 1000;
            musicData[i][1] = Number.parseFloat(musicData[i][1]) * 1000;
        }

        MusicManager._musicData = musicData;

        Music.SONG1.once('play', () => {
            MusicManager._internalPlayTime = Date.now();
            MusicManager._musicDuration = Music.SONG1.duration() * 1000;
        });
        Music.SONG1.play();
    }

    static isActive(time) {
        return MusicManager._bpmPlayTime > 0 && time - MusicManager._internalPlayTime < MusicManager._musicDuration;
    }

    static _onEvent(event) {
        const name = event[2];
        if (name.startsWith('bpm')) {
            const bpm = name.substring(3);
            MusicManager._msPerBeat = 60000 / Number.parseFloat(bpm);
            MusicManager._bpmPlayTime = MusicManager._internalPlayTime + event[0];
        }
        console.log('EVENT', name);
    }

    static _getCurrentEvent() {
        return MusicManager._musicData[MusicManager._nextEventIndex];
    }

    static getClosestBeatTime(time) {
        if (!MusicManager._bpmPlayTime) {
            return null;
        }

        const delta = time - MusicManager._bpmPlayTime;
        return Math.round(delta / MusicManager._msPerBeat) * MusicManager._msPerBeat + MusicManager._bpmPlayTime;
    }

    static getBeatCountFloat(time) {
        if (!MusicManager._bpmPlayTime) {
            return null;
        }

        const delta = time - MusicManager._bpmPlayTime;
        return delta / MusicManager._msPerBeat
    }
}