import makeDocumentHead from "./makeDocumentHead.js";
import generateLinkBlock from "./generateLinkBlock.js";

function littleBonsaiPresents(feed) {
	if (feed.site.showLBZLink) {
		return `
			<p class="text-lg font-lbz py-2">
				<a
					class="underline text-blue-900 hover:text-blue-700 hover:bold"
					href="https://littlebonsai.co.uk"
				>little bonsai</a> presents
			</p>`;
	} else {
		return "";
	}
}

function generateEpisodeThumb(feed, image) {
	if (feed.site.showThumbs) {
		return `<img src="${image}" class="w-32 h-32 mr-2 shadow-lg"/>`;
	} else {
		return "";
	}
}

function generateListenLink(episode) {
	if (episode?.links?.listen) {
		return `
			<a
				class="pointer-events-auto cursor-pointer underline text-blue-900 hover:text-blue-700 hover:bold"
				href="${episode.links.listen}"
				title="listen"
			>
				listen
			</a> `;
	}
}

function generateShareLink(feed, { title, slug }) {
	if (feed?.site?.showShare) {
		return `
			<button
				data-title="${title}"
				data-slug="${slug}"
				class="lbz-share-button pointer-events-auto cursor-pointer underline hover:bold transition-color hover:text-blue-700 text-blue-900"
			>
				share
			</button>`;
	}
}

function generateEpisodeLink(opts, feed, episode) {
	const { links, slug, title, summary, description, media, site } = episode;

	return `
<div class="py-2"><hr class="border-gray-300" /></div>
<div class="cursor-default hover:shadow max-w-2xl overflow-x-hidden py-2 px-1 relative shadow-none transition w-full episodePreviewContainer" >
	<div class="pointer-events-none -translate-x-2 absolute inset-0 border-l-8 px-1 transform transition-transform z-10 border-${
		site?.color || feed.site.color
	} episodePreviewSlideout" ></div>
	<div class="px-3 flex flex-row z-20">
		${generateEpisodeThumb(feed, site?.image)}

		<div class="flex flex-col">
			<a href="${links?.homepage ?? `/episode/${slug}`}">
				<h3 class="text-2xl pb-1">
					 <span class="border-b-2 border-solid
						hover:bold transition-color hover:border-blue-700 border-blue-900"
					 >
						${title}
					</span>
				</h3>
			</a>

			<div class="flex">
				${[generateListenLink(episode), generateShareLink(feed, episode)]
					.filter(Boolean)
					.join(` <div class="text-gray-800 px-2">|</div>`)}
			</div>

			<div class="pt-1">
				${summary}
			</div>
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

function attemptShareScript(feed) {
	return `<script>
	async function attemptShare(event) {
		const el = event.target;
		const title = el.dataset.title;
		const slug = el.dataset.slug;

		const shareData = {
			title,
			url: [
				"${feed.homepage}",
				"episode",
				slug
			].join("/")
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
				el.textContent = "shared!";
				el.classList.remove("hover:text-blue-700");
				el.classList.remove("text-blue-900");
				el.classList.add("hover:text-green-600");
				el.classList.add("text-green-800");
			} catch (e) {
				el.textContent = "could not share";
				el.classList.remove("hover:text-blue-700");
				el.classList.remove("text-blue-900");
				el.classList.add("hover:text-red-600");
				el.classList.add("text-red-800");
				console.error(e);
			}

			return;
		}

		if (true) {
			try {
				const urlElem = document.createElement("input");
				urlElem.value = shareData.url;
				urlElem.id = "temp-url-select";
				document.body.appendChild(urlElem);

				const elemInserted = document.getElementById("temp-url-select");
				elemInserted.select();
				document.execCommand("copy");
				elemInserted.remove();

				el.textContent = "coppied to clipboard!";
				el.classList.remove("hover:text-blue-700");
				el.classList.remove("text-blue-900");
				el.classList.add("hover:text-green-600");
				el.classList.add("text-green-800");
			} catch (e) {
				console.error(e);
				el.textContent = "could not share";
				el.classList.remove("hover:text-blue-700");
				el.classList.remove("text-blue-900");
				el.classList.add("hover:text-red-600");
				el.classList.add("text-red-800");
			}
		}
	}

	document
		.querySelectorAll(".lbz-share-button")
		.forEach( buttonEl => { buttonEl.addEventListener("click", attemptShare)})

	</script>`;
}

export default function generateHomepage(opts, feed) {
	return `
<html>
	<head>${makeDocumentHead(opts, feed)}</head>

	<body class="font-lbz">
		<div class="flex flex-col min-h-full w-100 items-center">
			<header class="flex-col self-center flex items-center pb-4 pt-4" >
				${littleBonsaiPresents(feed)}
				${feed.site.logoArea}
				${generateLinkBlock({
					...feed.links,
					className: "justify-center text-4xl md:text-6xl py-4",
				})}
			</header>

			<div class="flex-1 items-stretch w-full max-w-2xl">
				${feed.episodes.map(generateEpisodeLink.bind(null, opts, feed)).join("\n")}
			</div>

			${footer()}
		</div>

		${attemptShareScript(feed)}
	
	</body>
</html>
			`;
}
