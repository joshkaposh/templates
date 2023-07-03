import { Vect2 } from './vect';
import { collision } from '../math';
import Game from './Game';
const { pointCircle } = collision
type Colors = 'white' | 'green' | 'yellow' | 'red';

// const left = new Vect2().dir(Vect2.left);
// const right = new Vect2().dir(Vect2.right);
// const up = new Vect2().dir(Vect2.up);
// const down = new Vect2().dir(Vect2.down);

// console.log('left', left);
// console.log('right', right);
// console.log('up', up);
// console.log('down', down);



export default class Ball {
    position: Vect2;
    radius: number;
    #minPower: number;
    #mouse!: Game['input']['mouse'];
    #color: Colors;
    #dragging = false;
    #dragged = {
        start: new Vect2(0, 0),
        dist: 0,
    }

    constructor(position: Vect2, radius: number) {
        this.position = position;
        this.radius = radius;
        this.#color = 'white';
        this.#minPower = Math.floor(Vect2.dist(this.position, new Vect2(position.x + radius, position.y + radius)))
    }

    init(game: Game) {
        this.position.x = game.center.x;
        this.position.y = game.center.y;
        this.#mouse = game.input.mouse;

        this.#mouse.onMousedown(() => {
            if (pointCircle(this.#mouse.x, this.#mouse.y, this.position.x, this.position.y, this.radius)) {
                this.#dragging = true;
            }
            this.#dragged.start.x = this.#mouse.x;
            this.#dragged.start.y = this.#mouse.y;

        })

        this.#mouse.onMouseup(() => {
            if (this.#dragging) {
                this.#dragging = false;
            }
        })

        this.#mouse.onMousemove(() => {
            if (this.#dragging && this.#mouse.held) {
                this.#dragged.dist = Vect2.dist(this.#dragged.start, new Vect2(this.#mouse.x, this.#mouse.y))
            }
        })
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.#color
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.fillText('Min Power: ' + this.#minPower, 50, 50)

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.#mouse.x, this.#mouse.y);
        ctx.stroke();
        ctx.closePath();

        if (this.#dragging) {
            // dist
            ctx.fillText('Dist: ' + this.#dragged.dist, 50, 100)
            // ctx.beginPath();
            // ctx.moveTo(this.position.x, this.position.y);
            // ctx.lineTo(this.#mouse.x, this.#mouse.y);
            // ctx.stroke();
            // direction
            const dir = Vect2.dir(this.position, this.#mouse.position).norm()!.mult(50);
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.position.x + dir.x, this.position.y + dir.y);
            ctx.stroke()
        }
    }

    update(dt: number) {
        const collided = pointCircle(this.#mouse.x, this.#mouse.y, this.position.x, this.position.y, this.radius)
        if (!collided) {
            this.#color = 'white';
            return;
        }
        this.#color = 'green'
        if (!this.#mouse.pressed) return;
        if (this.#mouse.held) {
            this.#color = 'red'
        }
    }
}