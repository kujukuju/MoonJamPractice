class Renderer {
    static _application;
    static container;
    static staticBackgroundContainer;

    // [[position, velocity, sprite], ...]
    static _squares = [];

    static initialize() {
        Renderer._application = new PIXI.Application({
            antialias: true,
            backgroundColor: 0x000000,
            width: window.innerWidth,
            height: window.innerHeight});

        const canvasContainer = document.getElementById('canvas-container');
        canvasContainer.appendChild(Renderer._application.view);

        Renderer.staticBackgroundContainer = new PIXI.Container();
        Renderer.container = new PIXI.Container();

        Renderer._application.stage.addChild(Renderer.staticBackgroundContainer);
        Renderer._application.stage.addChild(Renderer.container);
    }

    static updateRender(time) {
        SquareManager.updateRender(time);
        ClickSuccessManager.updateRender(time);

        Camera.updateRender(time);
    }
}
