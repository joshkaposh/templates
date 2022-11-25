import {EventListener} from '../types/events'
import Mouse from './Mouse';

export default class  implements EventListener {
    mouse: Mouse;

    constructor(canvas:HTMLCanvasElement) {
        this.mouse = new Mouse(canvas)
    }

    init() {
        this.mouse.init();
    }


    cleanup() {
        this.mouse.cleanup();
    }
}