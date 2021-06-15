export default function makeDocumentHead(feed) {
	return `
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

${feed.fonts
	.map(
		(font) =>
			`<link rel="preload" href="/fonts${font}" as="font" crossorigin="anonymous" />`,
	)
	.join("\n")}

<link
	rel="alternate"
	type="application/rss+xml"
	title="Subscribe"
	href="${feed.links.rss}"
/>

<meta name="googlebot" content="index,follow" />
<meta name="rating" content="General" />
<meta name="referrer" content="no-referrer" />
<meta name="robots" content="index,follow" />
${
	"" /*<script async="" data-no-cookie="true" data-api="/_hive" src="/bee.js" ></script>*/
}
<link rel="icon" sizes="16x16" href="/logos/Square@16.png" />
<link rel="icon" sizes="32x32" href="/logos/Square@32.png" />
<link rel="icon" sizes="64x64" href="/logos/Square@64.png" />
<link rel="icon" sizes="128x128" href="/logos/Square@128.png" />
<link rel="icon" sizes="192x192" href="/logos/Square@192.png" />
<link rel="icon" sizes="256x256" href="/logos/Square@256.png" />
<link rel="icon" sizes="512x512" href="/logos/Square@512.png" />
<link rel="apple-touch-icon" href="/logos/Square@192.png" />
<meta name="viewport" content="width=device-width" />
<meta charset="utf-8" />
<meta name="apple-itunes-app" content="app-id=${feed.links.itunes.url}" />
<meta name="twitter:site" content="@TheLittleBonsai" />
<meta name="twitter:creator" content="@TheLittleBonsai" />
<meta name="og:url" content="${feed.homepage}" />
<meta name="og:title" content="${feed.title}" />
<meta name="description" content="${feed.subtitle}" />
<meta name="subject" content="${feed.subtitle}" />
<link rel="shortcut icon" href="/favicon.png" />
<title>${feed.title}</title>
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="${feed.homepage}" />
<meta name="twitter:title" content="${feed.title}" />
<meta name="twitter:description" content="${feed.subtitle}" />
<meta name="twitter:image" />
<meta property="og:image" />
<meta property="og:description" content="${feed.subtitle}" />

<link href="/main.css" rel="stylesheet">
`;
}
