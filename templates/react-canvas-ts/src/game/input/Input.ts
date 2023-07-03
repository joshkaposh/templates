import Keyboard from './Keyboard';
import Mouse from './Mouse';

export default class Input {
    mouse: Mouse;
    keyboard: Keyboard;
    constructor() {
        this.mouse = Mouse.instance();
        this.keyboard = Keyboard.instance();
    }

    cleanup() {
        this.mouse.cleanup();
        this.keyboard.cleanup();
    }
}