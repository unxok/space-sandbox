export class Body {
	constructor(
		public color: string,
		public radius: number,
		public x: number,
		public y: number,
		public mass: number,
		public vx: number,
		public vy: number
	) {}

	updatePosition(dt: number) {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}
