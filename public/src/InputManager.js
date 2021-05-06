class InputManager {
    static mouseDown = false;

    static initialize() {
        window.addEventListener('mousedown', event => {
            InputManager.mouseDown = true;

            event.preventDefault();
            return false;
        });
        window.addEventListener('mouseup', event => {
            InputManager.mouseDown = false;

            event.preventDefault();
            return false;
        });
    }
}