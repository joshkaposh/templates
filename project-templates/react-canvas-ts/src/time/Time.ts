
export default class Time {
    private delta: number;
    private totalDelta: number;
    private lastFrameTime: number;
    private fps:number;
    
    constructor() {
        this.delta = -1;
		this.fps = -1;
		this.totalDelta = -1;
		this.lastFrameTime = -1;
	}
	getTime() {
		if (this.lastFrameTime === -1) {
			this.lastFrameTime = performance.now();
            this.totalDelta = 0;
            this.delta = 0;
			this.fps = 0;
            return {delta:this.delta,fps:this.fps,totalDelta:this.totalDelta}		}

		this.delta = (performance.now() - this.lastFrameTime) / 1000;
		this.lastFrameTime = performance.now();
		this.totalDelta += this.delta;
        this.fps = Math.round(1/this.delta)
		return {delta:this.delta,fps:this.fps,totalDelta:this.totalDelta};
	}
}
