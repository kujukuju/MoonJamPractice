class Countdown {
    static _text = new PIXI.Text('3', {
        fontFamily: 'Arial',
        fontSize: 400,
        fill: 0xffffff,
        align: 'center'});
    static _remainingCountdown = 3000;

    static initialize() {
        Countdown._text.position.x = window.innerWidth / 2;
        Countdown._text.position.y = window.innerHeight / 2;
        Countdown._text.anchor.x = 0.5;
        Countdown._text.anchor.y = 0.5;
        Renderer.container.addChild(Countdown._text);
    }

    static update(time, dt) {
        Countdown._remainingCountdown -= dt;

        const seconds = Math.ceil(Countdown._remainingCountdown / 1000);
        if (seconds <= 0) {
            Countdown._text.visible = false;
            Countdown._playMusic();
        } else {
            Countdown._text.visible = true;
            Countdown._text.text = String(seconds);
        }
    }

    static isPlaying() {
        return Countdown._remainingCountdown <= 0;
    }

    static _playMusic() {
        MusicManager.play(Music.SONG1_LABELS);
    }
}