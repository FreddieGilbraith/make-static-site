
const lbzConfig =require( "@little-bonsai/tailwind-config");

module.exports = {
	...lbzConfig,
	mode: "jit",
	purge: [
		"output/**/*.html",
	]
}