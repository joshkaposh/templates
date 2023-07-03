import { Vect2 } from "./game/vect";

export const random = {
    intInRange(min: number, max: number) {
        // inclusive 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

export const collision = {
    pointRect(px: number, py: number, rpx: number, rpy: number, rw: number, rh: number) {
        return px >= rpx && px <= rpx + rw && py >= rpy && py <= rpy + rh
    },

    rectRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) {
        return x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2
    },

    pointCircle(px: number, py: number, cx: number, cy: number, cr: number) {
        const distX = px - cx;
        const distY = py - cy;
        if (Math.sqrt((distX * distX) + (distY * distY)) <= cr) {
            //distance is less than radius we know we're in the circle
            return true
        }
        return false
    },

    circleCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) {
        const x = x1 - x2;
        const y = y1 - y2;

        return r1 + r2 > Math.sqrt((x * x) + (y * y))

    },

    circleRect(cPX: number, cPY: number, cR: number, rPX: number, rPY: number, rW: number, rH: number) {
        const distX = Math.abs(cPX - rPX - rW / 2);
        const distY = Math.abs(cPY - rPY - rH / 2);

        if (distX > (rW / 2 + cR)) { return false; }
        if (distY > (rH / 2 + cR)) { return false; }

        if (distX <= (rW / 2)) { return true; }
        if (distY <= (rH / 2)) { return true; }

        const dx = distX - rW / 2;
        const dy = distY - rH / 2;
        return (dx * dx + dy * dy <= (cR * cR));
    }
}

export const operations = {
    lerp(x: number, y: number, a: number) {
        return x * (1 - a) + y * a
    },
    sat(x: number) {
        return Math.min(Math.max(x, 0.0), 1.0)
    }
}

export default {
    collision,
    random,
    operations,
    Vect2
}