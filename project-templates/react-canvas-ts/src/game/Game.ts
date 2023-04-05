import Time from './Time';
import { Vect2 } from './vect';
import Input from './input/Input';
import Ball from './Ball';

export default class Game {
    #canvas: HTMLCanvasElement
    #ctx: CanvasRenderingContext2D;
    #time: Time;
    #ball: Ball;
    #animationId!: number;
    #running = false;
    input = new Input();
    center;

    constructor(canvas: HTMLCanvasElement) {
        this.#time = new Time();
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d')!
        this.center = { x: canvas.width / 2, y: canvas.height / 2 }
        this.#ball = new Ball(new Vect2(this.center.x, this.center.y), 25)
    }

    resize() {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
        this.center.x = Math.floor(this.#canvas.width / 2);
        this.center.y = Math.floor(this.#canvas.height / 2);
    }

    init() {
        this.#time.getTime();
        window.addEventListener('resize',
            this.resize.bind(this)
        )
        this.resize()
        this.#ball.init(this)
    }

    start() {
        this.#running = true;
        this.loop();
    }

    stop() {
        this.#running = false;
        cancelAnimationFrame(this.#animationId);
    }

    loop() {
        this.#time.getTime();
        const dt = this.#time.deltaTime;
        this.render(dt);
        this.update(dt);
        this.#animationId = window.requestAnimationFrame(this.loop.bind(this))
    }

    render(dt: number) {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
        this.#ball.render(this.#ctx)
        this.#ctx.fillStyle = '#000000'
    }

    update(dt: number) {

        this.#ctx.font = '20px Arial'
        this.#ball.update(dt)
    }

    cleanup() {
        window.removeEventListener('resize', this.resize);
        if (this.#running) {
            cancelAnimationFrame(this.#animationId)
        }

    }
}