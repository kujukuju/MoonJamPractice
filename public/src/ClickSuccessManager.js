class ClickSuccessManager {
    static _mouseDown = false;

    static _backgroundSprite;

    static _greenValue = 0;
    static _greenValueInterp = new Interp(0);

    static initialize() {
        ClickSuccessManager._backgroundSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        Renderer.staticBackgroundContainer.addChild(ClickSuccessManager._backgroundSprite);

        ClickSuccessManager._backgroundSprite.position.x = 0;
        ClickSuccessManager._backgroundSprite.position.y = 0;
        ClickSuccessManager._backgroundSprite.width = window.innerWidth;
        ClickSuccessManager._backgroundSprite.height = window.innerHeight;
        ClickSuccessManager._backgroundSprite.tint = 0x000000;
    }

    static update(time, dt) {
        if (InputManager.mouseDown && !ClickSuccessManager._mouseDown) {
            ClickSuccessManager._mouseDown = true;

            const closestBeatDT = time - MusicManager.getClosestBeatTime(time);
            const successPercent = 1 - Math.min(Math.abs(closestBeatDT) / 80, 1);

            ClickSuccessManager._greenValue = successPercent * 0xaf;

            console.log(closestBeatDT);
        } else if (!InputManager.mouseDown) {
            ClickSuccessManager._mouseDown = false;
        }

        ClickSuccessManager._greenValue = Math.max(ClickSuccessManager._greenValue - dt * 1, 0);
        ClickSuccessManager._greenValueInterp.add(time, ClickSuccessManager._greenValue);
    }

    static updateRender(time) {
        const greenValue = ClickSuccessManager._greenValueInterp.get(time);
        console.log(greenValue);
        ClickSuccessManager._backgroundSprite.tint = (Math.floor(greenValue / 2) << 16) | (Math.floor(greenValue) << 8) | Math.floor(greenValue / 2);
    }
}
