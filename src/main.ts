import { Body } from "./Body";
import { CANVAS_ID } from "./STRING_CONSTS";
import "./style.css";

const fixDpi = (canvas: HTMLCanvasElement) => {
	const dpi = window.devicePixelRatio;
	const styleHeight = +getComputedStyle(canvas)
		.getPropertyValue("height")
		.slice(0, -2);
	const styleWidth = +getComputedStyle(canvas)
		.getPropertyValue("width")
		.slice(0, -2);
	canvas.setAttribute("height", (styleHeight * dpi).toString());
	canvas.setAttribute("width", (styleWidth * dpi).toString());
};

const calculateForce = (
	body1: Body,
	body2: Body
): { fx: number; fy: number } => {
	// const G = 6.6743e-11;
	const G = 1;
	const dx = body2.x - body1.x;
	const dy = body2.y - body1.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const force = (G * body1.mass * body2.mass) / (distance * distance);
	const fx = force * (dx / distance);
	const fy = force * (dy / distance);
	return { fx, fy };
};

const updateVelocities = (bodies: Body[], dt: number) => {
	for (let i = 0; i < bodies.length; i++) {
		let ax = 0;
		let ay = 0;
		for (let j = 0; j < bodies.length; j++) {
			if (i !== j) {
				const { fx, fy } = calculateForce(bodies[i], bodies[j]);
				ax += fx / bodies[i].mass;
				ay += fy / bodies[i].mass;
			}
		}
		// console.log(`body ${i} velocity before: ${bodies[i].vx} ${bodies[i].vy}`);
		bodies[i].vx += ax * dt;
		bodies[i].vy += ay * dt;
		// console.log(`body ${i} velocity after: ${bodies[i].vx} ${bodies[i].vy}`);
	}
};

const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
fixDpi(canvas);

const bodies = [
	new Body("orange", 250, 800, 350, 1000, 0, 0),
	new Body("blue", 50, 225, 350, 1, 0, 1),
];

const dt = 1;
const animationLoop = () => {
	if (!ctx) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateVelocities(bodies, dt);
	bodies.forEach((b) => {
		b.updatePosition(dt);
		b.draw(ctx);
		// console.log(`${b.color} ${b.x} ${b.y}`);
	});

	requestAnimationFrame(animationLoop);
};

animationLoop();
