
export default class Time {
	#deltaTime: number;
	#totalDeltaTime: number;
	#lastFrameTime: number;
	#fps: number;

	constructor() {
		this.#deltaTime = -1;
		this.#fps = -1;
		this.#totalDeltaTime = -1;
		this.#lastFrameTime = -1;
	}

	get deltaTime() {
		return this.#deltaTime
	}

	get fps() {
		return Math.round(1 / this.#deltaTime)
	}

	getTime() {
		if (this.#lastFrameTime === -1) {
			this.#lastFrameTime = performance.now();
			this.#totalDeltaTime = 0;
			this.#deltaTime = 0;
			return -1;
		}

		this.#deltaTime = (performance.now() - this.#lastFrameTime) / 1000;
		this.#lastFrameTime = performance.now();
		this.#totalDeltaTime += this.#deltaTime;
		return this.#deltaTime;
	}
}
