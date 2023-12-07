/**
 * @type {import("lint-staged").Config}
 */
module.exports = {
	"*.{astro,css,ejs,js,json,jsx,md,mdx,mjs,ts,tsx,yaml,yml}": "bun run prettier --list-different",
}
