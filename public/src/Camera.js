class Camera {
    static _position = new Vec2(window.innerWidth / 2, window.innerHeight / 2);
    static _positionInterp = new Interp(Camera._position);

    static _densityOffset = 0;
    static _densityOffsetInterp = new Interp();

    static _densityVelocity = 0;

    static update(time, dt) {
        Camera._densityVelocity = Camera._densityVelocity - 0.0012 * dt;

        Camera._densityOffset = Math.max(Camera._densityOffset + Camera._densityVelocity * dt, 0);
        if (Camera._densityOffset === 0) {
            Camera._densityVelocity = 0;
        }
        Camera._densityOffsetInterp.add(time, Camera._densityOffset);

        Camera._positionInterp.add(time, Camera._position);
    }

    static updateRender(time) {
        const position = Camera._positionInterp.get(time) || new Vec2();
        const density = 1 - Math.min((Camera._densityOffsetInterp.get(time) ?? 0) / 10, 0.9);
        const positionX = -position[0] * density + window.innerWidth / 2;
        const positionY = -position[1] * density + window.innerHeight / 2;

        Renderer.container.position.x = positionX;
        Renderer.container.position.y = positionY;
        Renderer.container.scale.x = density;
        Renderer.container.scale.y = density;
    }

    static addDensityVelocity() {
        Camera._densityVelocity = 0.04;
    }
}