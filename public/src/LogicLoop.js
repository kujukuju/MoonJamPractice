class LogicLoop {
    static initialize() {

    }

    static update(time, dt) {
        if (!Countdown.isPlaying()) {
            Countdown.update(time, dt);
            return;
        }

        MusicManager.update(time, dt);
        ClickSuccessManager.update(time, dt);

        SquareManager.update(time, dt);

        Camera.update(time, dt);
    }
}
