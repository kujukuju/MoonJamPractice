class Loop {
    static LOGIC_MS = 17;

    static _lastTime = 0;

    static initialize() {
        Loop.loop();

        requestAnimationFrame(Loop.render);
    }

    static loop() {
        const start = Date.now();
        if (!Loop._lastTime) {
            Loop._lastTime = start;
        }

        const dt = start - Loop._lastTime;
        LogicLoop.update(start, dt);
        Loop._lastTime = start;

        const delay = Math.max(Loop.LOGIC_MS - (Date.now() - start), 1);
        setTimeout(Loop.loop, delay);
    }

    static render() {
        const start = Date.now();

        requestAnimationFrame(Loop.render);
    }
}
