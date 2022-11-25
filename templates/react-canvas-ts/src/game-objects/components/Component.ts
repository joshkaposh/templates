import GameObject from '../GameObject';

interface ComponentTemplate {
    readonly go: GameObject;
    // id: number;

    init: () => void;
    update: (dt:number) => void;
}

export default class Component implements ComponentTemplate {
    readonly go: GameObject;
    constructor(owner:GameObject) {
        this.go = owner;
    }

    init() {

    }

    update(dt:number) {}

}