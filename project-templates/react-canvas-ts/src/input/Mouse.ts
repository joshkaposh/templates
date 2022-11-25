import {EventListener} from '../types/events'

export default class Mouse implements EventListener {
    readonly pos: { x: number, y: number };
    // private canvas: HTMLCanvasElement;
    constructor(canvas:HTMLCanvasElement) {
        this.pos = { x: 0, y: 0 }
        // this.canvas = canvas;
        this.init()

    }

    move(e:MouseEvent) {
        this.pos.x = e.x;
        this.pos.y = e.y;
    }

    init() {
        window.addEventListener('mousemove',this.move.bind(this))
    }
    cleanup() {
        window.removeEventListener('mousemove',this.move.bind(this))
    }
    
}