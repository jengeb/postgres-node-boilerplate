const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const { Client } = require('pg')
const BodyParser = require('koa-bodyparser')
const mount = require('koa-mount')

const {
	PORT = 9000,
  DATABASE_URL
} = process.env

function createRouter() {
	const router = new Router()
	// define endpoints
	router.get('/', (ctx, next) => {
		ctx.body = 'Hello World!'
	})
	return router
}

async function main() {
  const client = new Client(DATABASE_URL)
  await client.connect()

	// use client to create db tables

	const router = createRouter()
	const app = new Koa()

	app.use(cors())
		.use(BodyParser())
		.use(mount(router.routes()))
		.use(router.allowedMethods())

	// start server
	app.listen(PORT, function () {
		process.stdout.write(`Server now listening on port ${PORT}\n`)
	})
}

// call main() and catch errors
main().catch(err => {
	process.stderr.write(`${err.message}\n`);
	process.exit(1);
});

module.exports = main
