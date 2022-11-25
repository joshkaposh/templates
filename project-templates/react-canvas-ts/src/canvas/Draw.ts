

interface point {
    x: number;
    y: number;
}

export default class DrawToCanvas {
	private c;
	constructor(canvas:HTMLCanvasElement) {
		this.c = canvas.getContext("2d")!;
	}

	clear(x:number, y:number, width:number, height:number) {
		this.c.clearRect(x, y, width, height);
	}

	clearCanvas() {
		this.c.clearRect(0,0,this.c.canvas.width,this.c.canvas.height)
	}

	set fill(color:string) {
		this.c.fillStyle = color;
	}

	set stroke(color:string) {
		this.c.strokeStyle = color;
	}
	
	set weight(lineWidth: number) {
		this.c.lineWidth = lineWidth;
	}

	set font(font:string) {
		this.c.font = font;
	}

	circle(x:number, y:number, radius:number, fillBool:boolean) {
		this.c.beginPath();
		this.c.arc(x, y, radius, 0, Math.PI * 2, false);
		fillBool ? this.c.fill() : this.c.stroke();
		this.c.closePath();
	}

	alignedText(text:string,pos:point,alignment:'start' | 'end' | 'left' | 'right' | 'center') {
		this.c.beginPath()
		this.c.moveTo(pos.x, pos.y);
		this.c.textAlign = alignment;
		this.c.fillText(text,pos.x,pos.y)		
		this.c.closePath();
	
	}

	text(text:string, x:number, y:number, maxWidth?:number) {
		this.c.beginPath();
		this.c.fillText(text, x, y, maxWidth);
		this.c.closePath();
	}

	rect(x:number, y:number, width:number, height:number, fillBool:boolean) {
		this.c.beginPath();
		this.c.rect(x, y, width, height);
		fillBool ? this.c.fill() : this.c.stroke();
		this.c.closePath();
	}

	drawLine(p1:point, p2:point) {
		this.c.beginPath();
		this.c.moveTo(p1.x, p1.y);
		this.c.lineTo(p2.x, p2.y);
		this.c.stroke();
		this.c.closePath();
	}
}
