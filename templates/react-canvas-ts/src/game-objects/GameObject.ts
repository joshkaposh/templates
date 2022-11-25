import Vect2 from '../vect/Vect2'
import Component from './components/Component';

interface GameObjectTemplate {
    // ! includes pos: Vect2;
    components: Component[]
    // addComponent: (cp: Component) => void;
    // removeComponent: (cpId: number) => void;
    // getComponent(cp)
    update: (dt: number) => void;
    init: () => void;        
}

export default class GameObject implements GameObjectTemplate  {
    private _pos: Vect2;
    components: Component[];
    constructor(x:number,y:number) {
        this._pos = new Vect2(x,y)
        this.components = [];
    }



    get pos() {
        return this._pos;
    }

    init() {

    }

    update(dt:number) {

    }
}