import { PubSub } from "../../events";
import { Vect2 } from "../vect";

type MouseEventTypes = 'Mousemove' | 'Mousedown' | 'Mouseheld' | 'Mouseup'

export default class Mouse extends PubSub<MouseEventTypes> {
    #position = new Vect2(0, 0);
    #pressed = false;
    #held = false;

    get position() {
        return this.#position;
    }

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    get pressed() {
        return this.#pressed
    }

    get held() {
        return this.#held
    }

    static #instance: Mouse;
    static instance(): Mouse {
        if (!Mouse.#instance) {
            Mouse.#instance = new Mouse();
        }
        return Mouse.#instance;
    }

    private constructor() {
        super(['Mousemove', 'Mousedown', 'Mouseheld', 'Mouseup']);
        window.addEventListener('mousemove', this.#mousemove.bind(this))
        window.addEventListener('mousedown', this.#mousedown.bind(this))
        window.addEventListener('mouseup', this.#mouseup.bind(this))
    }

    onMousemove(fn: () => void) {
        return this.subscribe('Mousemove', fn)
    }

    onMousedown(fn: () => void) {
        return this.subscribe('Mousedown', fn)
    }

    onMouseup(fn: () => void) {
        return this.subscribe('Mouseup', fn)
    }

    onMouseheld(fn: () => void) {
        return this.subscribe('Mouseheld', fn)
    }

    #mousemove(e: MouseEvent) {
        this.#position.x = e.clientX;
        this.#position.y = e.clientY;
        this.notify('Mousemove')
    }

    #mousedown() {
        if (!this.#pressed) {
            this.notify('Mousedown');
            this.#pressed = true;
        }
        setTimeout(() => {
            if (!this.pressed) {
                return;
            }
            this.#held = true
            this.notify('Mouseheld');
        }, 1)
    }

    #mouseup() {
        this.#pressed = false;
        this.#held = false;
        this.notify('Mouseup');
    }

    cleanup() {
        window.removeEventListener('mousemove', this.#mousemove);
        window.removeEventListener('mousedown', this.#mousedown.bind(this))
        window.removeEventListener('mouseup', this.#mouseup.bind(this))
        this.disposeSubscribers();
    }
}
