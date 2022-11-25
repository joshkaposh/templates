import Input from "./input/Input";
import Draw from './canvas/Draw'
import Time from './time/Time';

interface Point {
    x: number;
    y: number;
}

interface GameManager {
    time: Time;
    input: Input;
    draw: Draw;

    center: Point;

    init: Function;
    render: Function;
    update: Function;
    cleanup: Function;
}

const resizeToWindow = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


export default class Game implements GameManager {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D;
    time;
    input;
    draw;
    center;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!
        this.time = new Time();
        this.input = new Input(canvas);
        this.draw = new Draw(canvas);
        
        this.center = {x:canvas.width/2,y:canvas.height/2}
    }

    private _requestFrame() {
        window.requestAnimationFrame(this.update.bind(this))
    }

    start() {
        this.ctx.font = '20px Arial'
        this._requestFrame();        
    }

    init() {
        resizeToWindow(this.canvas)
        this.center = { x:this.canvas.width/2,y:this.canvas.height / 2}
    }

    render() {
        const {delta,fps} =this.time.getTime()
        const { mouse } = this.input;
        this.draw.clearCanvas();
        this.draw.fill = 'black';
        this.draw.rect(0, 0, 50, 50, true)
        this.draw.alignedText('Hello from React Canvas', this.center,'center')
        this.draw.text(`FPS: ${fps}`, this.center.x, 20)
        this.draw.fill = 'red'
        this.draw.circle(mouse.pos.x, mouse.pos.y, 5, true);
        

    }

    update() {
        this.render();
        this._requestFrame();
    }

    cleanup() {

    }
}