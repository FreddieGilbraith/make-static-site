import makeDocumentHead from "./makeDocumentHead.js";
import generateLinkBlock from "./generateLinkBlock.js";

function littleBonsaiPresents() {
	return `
<p class="text-lg font-lbz py-2">
	<a
		class="underline text-blue-900 hover:text-blue-700 hover:bold"
		href="https://littlebonsai.co.uk"
	>
		little bonsai
	</a >
	presents
</p>`;
}

function logoArea() {
	return `
<a href="/" >
	<h1 class="pt-4 font-plague text-5xl sm:text-5xl md:text-6xl" >
		<span class="text-green-700"> Plague </span>
		<span class="text-gray-800">Town</span>
	</h1>
</a >

<h2 class="text-xl sm:text-2xl md:text-3xl pb-4">
	A Coronavirus Comedy Podcast
</h2>`;
}

function generateEpisodeLink({
	slug,
	title,
	summary,
	description,
	image,
	links,
}) {
	return `
<div class="py-2"><hr class="border-gray-300" /></div>
<div class="cursor-default hover:shadow max-w-2xl overflow-x-hidden py-2 px-1 relative shadow-none transition w-full episodePreviewContainer" >
	<div class="pointer-events-none -translate-x-2 absolute inset-0 border-l-8 px-1 transform transition-transform z-10 border-green-700 episodePreviewSlideout" ></div>
	<div class="px-3 flex flex-col z-20">
		<a href="/episode/${slug}">
			<h3 class="text-2xl">${title}</h3>
		</a >
		<div class="flex">
			<a
				class="pointer-events-auto cursor-pointer underline text-blue-900 hover:text-blue-700 hover:bold"
				href="https://traffic.libsyn.com/secure/plaguetown/001-episode.mp3"
				title="listen"
			>
				listen
			</a >
			<div class="text-gray-800 px-2">|</div>
			<button
				class="pointer-events-auto cursor-pointer underline hover:bold transition-color hover:text-blue-700 text-blue-900"
			>
				share
			</button>
		</div>

		<div class="pt-1">
			${summary}
		</div>
	</div>
</div>`;
}

function footer() {
	return `
<footer class="self-stretch flex justify-center">
	<div class="flex-1 max-w-2xl my-4 p-2 px-5 text-right w-100 self-end text-lg" >
		Follow us for the latest updates

		<div class="flex justify-end">
			<span class="block pr-1">twitter:</span >
			<a
				class="underline text-blue-900 hover:text-blue-700 hover:bold block"
				href="https://twitter.com/TheLittleBonsai"
				target="_blank"
				rel="noreferrer noopener"
			>
				@TheLittleBonsai
			</a >
		</div>
	</div>
</footer>`;
}

export default function generateHomepage(opts, feed) {
	return `
<html>
	<head>${makeDocumentHead(feed)}</head>

	<body>
		<div class="flex flex-col min-h-full w-100 items-center">
			<header class="flex-col self-center flex items-center pb-4 pt-4" >
				${littleBonsaiPresents()}
				${logoArea()}
				${generateLinkBlock({
					...feed.links,
					className: "justify-center text-4xl md:text-6xl py-4",
				})}
			</header>

			<div class="flex-1 items-stretch w-full max-w-2xl">
				${feed.episodes.map(generateEpisodeLink).join("\n")}
			</div>

			${footer()}
	</body>
</html>
			`;
}
