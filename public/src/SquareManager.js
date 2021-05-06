class SquareManager {
    // [[position, angle, velocity, sprite], ...]
    static _squares = [];

    static initialize() {
        const texture = PIXI.Texture.WHITE;
        for (let i = 0; i < 100; i++) {
            const position = new Vec2(
                Math.random() * window.innerWidth * 2 - window.innerWidth / 2,
                Math.random() * window.innerHeight * 2 - window.innerHeight / 2);
            const positionInterp = new Interp(position);

            const square = new PIXI.Sprite(texture);
            square.position.x = position[0];
            square.position.y = position[1];
            square.width = 100;
            square.height = 100;
            square.anchor.x = 0.5;
            square.anchor.y = 0.5;
            Renderer.container.addChild(square);

            const angle = Math.random() * Math.PI * 2;
            const angleInterp = new Interp(angle);

            SquareManager._squares.push([positionInterp, angleInterp, [Math.cos(angle), Math.sin(angle)], square]);
        }
    }

    static update(time, dt) {
        for (let i = 0; i < SquareManager._squares.length; i++) {
            const square = SquareManager._squares[i];
            const rotDir = (i % 2) || -1;

            const position = square[0].latest();
            let angle = square[1].latest();
            const vel = square[2];

            position[0] += vel[0] / 10 * dt;
            position[1] += vel[1] / 10 * dt;
            angle += rotDir / 1000 * dt;

            square[0].add(time, position);
            square[1].add(time, angle);
        }
    }

    static updateRender(time) {
        for (let i = 0; i < SquareManager._squares.length; i++) {
            const square = SquareManager._squares[i];

            const position = square[0].get(time);
            const angle = square[1].get(time);
            const sprite = square[3];

            sprite.position.x = position[0];
            sprite.position.y = position[1];
            sprite.rotation = angle;
        }
    }
}