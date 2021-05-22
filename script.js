const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

const colours = [
	"white",
	"rgba(255, 255, 255, 0.3)",
	"rgba(173, 216, 230, 0.8)",
	"rgba(211, 211, 211, 0.8)",
]

const minSize = 0
const maxSize = 40

const mouse = {
	x: null,
	y: null,
	radius: 60
}

canvas.addEventListener("mousemove", event => {
	mouse.x = event.x
	mouse.y = event.y
})

class Particle {
	constructor (x, y, speedX, speedY, size, colour) {
		this.x = x
		this.y = y
		this.speedX = speedX
		this.speedY = speedY
		this.size = size
		this.colour = colour
	}

	draw () {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fillStyle = this.colour
		ctx.fill()
	}

	update () {
		if (this.x + (this.size * 2) > canvas.width || this.x - (this.size * 2) < 0) this.speedX = -this.speedX
		if (this.y + (this.size * 2) > canvas.height || this.y - (this.size * 2) < 0) this.speedY = -this.speedY

		this.x += this.speedX
		this.y += this.speedY

		if (Math.abs(mouse.x - this.x) < mouse.radius && Math.abs(mouse.y - this.y) < mouse.radius) {
			if (this.size < maxSize) this.size += 3
		}
		else if (this.size > minSize) {
			this.size -= 0.1
		}

		if (this.size < 0) this.size = 0

		this.draw()
	}
}

function init () {
	particles = []
	for (let i = 0; i < 1000; i++) {
		const size = 0
		const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
		const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
		const speedX = (Math.random() * 0.2) - 0.1
		const speedY = (Math.random() * 0.2) - 0.1
		const colour = colours[Math.floor(Math.random() * colours.length)]
		particles.push(new Particle(x, y, speedX, speedY, size, colour))
	}
}

function animate () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < particles.length; i++) {
		particles[i].update()
	}
	requestAnimationFrame(animate)
}

init()
animate()

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	init()
})

setInterval(function () {
	mouse.x = undefined
	mouse.y = undefined
}, 1000)








/*
canvas.addEventListener("click", event => {
	mouse.x = event.x
	mouse.y = event.y
	for (let i = 0; i < 10; i++) {
		particles.push(new Particle())
	}
})

let hue = 0;

function handleParticles () {
	for (let i = 0; i < particles.length; i++) {
		particles[i].update()
		particles[i].draw()
		for (let j = i; j < particles.length; j++) {
			const dx = particles[i].x - particles[j].x
			const dy = particles[i].y - particles[j].y
			const distance = Math.sqrt(dx * dx + dy * dy)
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particles[i].color
				ctx.lineWidth = 0.2
				ctx.moveTo(particles[i].x, particles[i].y)
				ctx.lineTo(particles[j].x, particles[j].y)
				ctx.stroke()
			}
		}
		if (particles[i].size < 0.3) {
			particles.splice(i, 1)
			i--
		}
	}
}
*/