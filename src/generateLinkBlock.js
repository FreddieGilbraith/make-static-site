function generateLink(to, children) {
	return `
<a
	rel="noopener noreferrer"
	target="_blank"
	href="${to}"
	class= "p-1 hover:no-underline duration-300 py-2 block"
>
	${children}
</a>`;
}

function generateGoogleLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" > <g fill="none"> <path fill="#0066d9" d="M64 238.545v34.91c0 17.673-14.327 32-32 32s-32-14.327-32-32v-34.91c0-17.673 14.327-32 32-32s32 14.327 32 32z" ></path> <path fill="#4285f4" d="M448.013 239.455a32.6 32.6 0 01-.013-.91c0-17.673 14.327-32 32-32s32 14.327 32 32c0 .304-.004.608-.013.91H512v34.909h-.013c-.48 17.252-14.618 31.09-31.987 31.09s-31.506-13.838-31.987-31.09H448v-34.91h.013z" ></path> <path fill="#ea4335" d="M174.545 343.273v34.909c0 17.673-14.326 32-32 32s-32-14.327-32-32v-34.91c0-17.672 14.327-32 32-32s32 14.328 32 32zm0-209.455V248h-.008c-.386 17.337-14.562 31.273-31.992 31.273S110.94 265.337 110.554 248h-.009V133.818c0-17.673 14.327-32 32-32s32 14.327 32 32z" ></path> <path fill="#34a853" d="M337.455 168.727c0 17.673 14.326 32 32 32s32-14.327 32-32v-34.909c0-17.673-14.327-32-32-32s-32 14.327-32 32z" ></path> <path fill="#fab908" d="M224 66.91c0 17.672 14.327 32 32 32s32-14.328 32-32V32c0-17.673-14.327-32-32-32s-32 14.327-32 32zm0 378.18c0-17.672 14.327-32 32-32s32 14.328 32 32V480c0 17.673-14.327 32-32 32s-32-14.327-32-32z" ></path> <path fill="#34a853" d="M337.455 264.727c0-17.673 14.326-32 32-32s32 14.327 32 32v113.455c0 17.673-14.327 32-32 32s-32-14.327-32-32z" ></path> <path fill="#fab908" d="M288 162.91v186.18c0 17.674-14.327 32-32 32s-32-14.326-32-32V162.91c0-17.674 14.327-32 32-32s32 14.326 32 32z" ></path> </g> </svg>`,
	);
}

function generateItunesLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 300 300"><defs><linearGradient id="a"><stop offset="0" stop-color="#822cbe"></stop><stop offset="1" stop-color="#d772fb"></stop></linearGradient><linearGradient id="b" x1="458.9" x2="456.36" y1="303.81" gradientTransform="translate(-309.21)" gradientUnits="userSpaceOnUse" xlink:href="#a"></linearGradient></defs><rect width="300" height="300" fill="url(#b)" ry="66.74"></rect><path fill="#fff" d="M140.84 262.64c-8.95-3.2-10.87-7.55-14.54-33.04-4.27-29.63-5.2-47.97-2.73-53.78 3.28-7.7 12.18-12.07 24.63-12.12 12.35-.05 21.33 4.36 24.63 12.12 2.48 5.8 1.55 24.15-2.72 53.78-2.9 20.7-4.5 25.93-8.5 29.45-5.5 4.87-13.3 6.22-20.7 3.6zm-38.23-30.4c-30.9-15.2-50.7-40.92-57.9-75.14-1.8-8.83-2.1-29.9-.4-38 4.5-21.75 13.1-38.76 27.4-53.8 20.6-21.72 47.1-33.2 76.6-33.2 29.2 0 55.6 11.27 75.7 32.34 15.3 15.9 23.9 32.73 28.3 54.9 1.5 7.38 1.5 27.5.1 35.8-4.6 26.24-19.2 50.14-40.5 66.2-7.6 5.74-26.2 15.76-29.2 15.76-1.1 0-1.2-1.14-.7-5.75.9-7.4 1.8-8.94 6-10.7 6.7-2.8 18.1-10.92 25.1-17.94 12.1-12 21-27.7 25.1-44.2 2.6-10.3 2.3-33.2-.6-43.8-9.1-33.7-36.6-59.9-70.3-66.9-9.8-2-27.6-2-37.5 0-34.1 7-62.3 34.5-70.9 69.1-2.3 9.4-2.3 32.3 0 41.7 5.7 22.9 20.5 43.9 39.9 56.4 3.8 2.5 8.4 5.1 10.3 5.9 4.2 1.8 5.1 3.3 5.9 10.7.5 4.5.4 5.8-.7 5.8-.7 0-5.8-2.2-11.2-4.8zm.4-40.68c-10.4-8.3-19.6-23.02-23.4-37.46-2.3-8.72-2.3-25.3.1-34 6.3-23.48 23.6-41.68 47.6-50.23 8.2-2.9 26.4-3.55 36.5-1.32 34.8 7.75 59.5 42.6 54.7 77.17-1.9 13.93-6.7 25.37-15.2 36-4.2 5.37-14.4 14.38-16.2 14.38-.3 0-.6-3.4-.6-7.54V181l5.2-6.2c19.6-23.48 18.2-56.28-3.2-77.8-8.3-8.38-17.9-13.3-30.3-15.57-8-1.48-9.7-1.48-18.1-.1-12.75 2.08-22.63 7.02-31.4 15.7-21.5 21.3-22.9 54.27-3.3 77.77l5.16 6.2v7.6c0 4.2-.33 7.6-.74 7.6-.4 0-3.3-2-6.4-4.5zm34.7-40.83c-8.9-4.14-13.7-11.95-13.8-22.13 0-9.15 5.1-17.13 13.9-21.8 5.6-2.94 15.5-2.94 21.1.02 6.1 3.17 11.1 9.32 13 15.74 5.8 19.72-15.1 37-34 28.17z"></path><circle cx="149.89" cy="129.67" r="24.94" fill="#fff"></circle><path fill="#fff" d="M152.28 164.27c1.73.23 5.17.68 8.35 1.7 3.2 1 6.1 2.57 8.36 4.18 2.2 1.6 3.8 3.26 4.8 5.28 1 2.02 1.5 4.42 1.8 8.35.2 3.94.2 9.4-.7 19.6-.9 10.17-2.7 25.08-4.1 34.63-1.4 9.6-2.4 13.8-3.7 16.9-1.3 3.2-3 5.3-4.9 6.8-1.9 1.5-4.1 2.4-6.2 2.9-2.1.5-4 .5-5.8.5-1.8 0-3.5 0-5.8-.5s-5.3-1.4-7.5-3.2c-2.3-1.8-3.8-4.4-5-7.8-1.2-3.4-2.1-7.5-3.3-15.7-1.2-8.2-2.8-20.4-3.8-29.7s-1.4-15.7-1.48-20c-.1-4.3.1-6.43.6-8.5.5-2 1.3-3.9 2.4-5.5 1.1-1.6 2.54-3 4-4.1 1.43-1.1 2.9-1.9 4.66-2.52 1.74-.7 3.83-1.3 6.4-1.8 2.6-.5 5.6-1 7.14-1.2 1.54-.23 1.54-.23 3.26 0z"></path></svg>`,
	);
}

function generateSpotifyLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 168 168"><path fill="#1ED760" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"></path></svg>`,
	);
}

function generateRssLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8" > <rect width="8" height="8" fill="orange" class="button" rx="1.5" ></rect> <circle cx="2" cy="6" r="1" fill="#fff" class="symbol"></circle> <path fill="#fff" d="M1 4a3 3 0 013 3h1a4 4 0 00-4-4z" class="symbol" ></path> <path fill="#fff" d="M1 2a5 5 0 015 5h1a6 6 0 00-6-6z" class="symbol" ></path> </svg>`,
	);
}

function generateYoutubeLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#FF0000" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z"></path></svg>`,
	);
}

function generateSoundcloudLink(to) {
	return generateLink(
		to,
		`<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="5.12 25.095 52.916 22.972"><linearGradient id="sound-cloud-gradient" x1="1172.791" x2="1172.791" y1="-1533.878" y2="-1639.876" gradientTransform="matrix(.2065 0 0 -.2065 -210.547 -291.026)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff8800"></stop><stop offset="1" stop-color="#ff3300"></stop></linearGradient><path fill="url(#sound-cloud-gradient)" d="M15.835 47.9c-.083-.082-.145-.268-.145-.393 0-.145-.083-1.403-.186-2.807l-.186-2.561.207-4.521c.206-4.604.227-4.769.578-4.769.062 0 .186.041.269.124.124.103.186.681.392 4.562l.248 4.459-.248 2.911c-.145 1.61-.289 2.973-.351 3.034-.145.166-.393.145-.578-.02V47.9zm2.105-.061c-.103-.145-.186-1.012-.33-3.097-.165-2.478-.186-3.18-.103-5.037.041-1.178.124-3.51.186-5.183.062-1.672.124-3.138.145-3.303.083-.537.702-.619.826-.103.021.103.145 2.601.269 5.532l.227 5.348-.227 2.767a293.778 293.778 0 00-.227 2.87c0 .164-.269.392-.454.392-.104 0-.227-.083-.31-.206v.02zm2.148.041c-.145-.145-.186-.372-.227-1.445-.042-.702-.104-1.755-.145-2.333-.124-1.465-.104-3.365.041-7.887.083-2.146.145-4.314.145-4.851.021-1.094.104-1.424.393-1.507.351-.083.619.165.619.599 0 .207.103 2.89.207 5.946l.207 5.554-.207 2.787c-.104 1.527-.207 2.828-.207 2.891 0 .164-.269.392-.475.392-.103 0-.248-.083-.351-.165v.019zm2.147 0c-.103-.124-.165-.372-.207-.764-.31-4.707-.31-5.038-.165-9.951.186-6.771.227-7.412.392-7.577s.62-.165.764 0c.083.083.145 1.28.248 3.964.248 7.494.269 8.691.103 11.148-.186 2.787-.206 3.034-.392 3.199-.186.186-.516.166-.723-.041l-.02.022zm2.147-.021c-.103-.104-.186-.33-.186-.475s-.062-1.383-.145-2.746c-.145-2.291-.145-2.932 0-8.485.165-6.441.165-6.338.64-6.441.413-.083.682.268.682.908 0 .289.041 1.796.083 3.324.041 1.528.103 3.86.145 5.183.021 1.301.062 2.436.083 2.498.021.062-.042 1.362-.145 2.89a185.27 185.27 0 00-.186 2.974c0 .247-.33.578-.619.578a.569.569 0 01-.392-.207h.04zm2.209.021c-.186-.186-.207-.413-.392-3.716-.103-1.92-.083-3.943.103-10.488.104-3.509.104-3.571.661-3.571.186 0 .372.062.475.186.186.186.186.33.268 3.344.021.949.104 3.262.145 5.12.083 3.034.083 3.675-.083 6.173-.165 2.684-.186 2.787-.392 2.952-.269.206-.599.206-.826 0h.041zm2.188 0c-.124-.124-.186-.351-.227-.764-.145-1.59-.248-5.533-.207-7.866.021-1.445.083-3.654.104-4.955.103-5.223.145-6.048.33-6.234.227-.227.681-.227.888 0 .227.227.248.888.454 10.963.062 3.035-.145 8.361-.351 8.732-.186.352-.723.413-1.012.124h.021zm2.251-.021a.77.77 0 01-.289-.475c-.021-.166-.104-1.508-.186-2.994-.103-2.126-.124-3.406-.062-6.008.042-1.816.104-4.83.145-6.688.062-4.253.104-4.666.351-4.914.269-.248.661-.227.95.041.207.207.227.289.248 1.342 0 .619.021 1.238.041 1.362s.042 1.879.083 3.901c.042 2.023.083 3.696.104 3.717.103.165.021 6.152-.104 8.01a104.788 104.788 0 00-.145 2.271c0 .227-.413.619-.681.619-.125.002-.332-.08-.455-.184zm2.002-.041l-.228-.228V26.244l.248-.186c.289-.227 1.383-.578 2.478-.805 1.177-.227 3.097-.207 4.315.041 4.871 1.012 8.34 4.749 9.125 9.827l.062.33.806-.227c.681-.186.929-.227 1.816-.186 1.26.062 1.321.062 2.146.371 3.635 1.383 5.285 5.574 3.531 9.043-.806 1.61-1.962 2.621-3.717 3.262l-.66.248-9.827.021-9.827.021-.268-.186zm-19.365-.083c-.041-.103-.165-1.466-.289-3.015-.207-2.725-.207-2.849-.062-4.582.083-.971.166-2.168.207-2.643.062-.867.207-1.281.434-1.281.289 0 .372.331.62 2.953l.248 2.684-.248 2.85c-.124 1.568-.269 2.932-.31 3.055-.041.145-.145.207-.31.207s-.248-.062-.31-.207l.02-.021zm-2.064.042c-.021-.042-.165-1.363-.289-2.932l-.248-2.85.248-2.952c.124-1.631.289-3.015.331-3.076.124-.145.31-.145.434 0 .062.062.227 1.425.372 3.056l.268 2.932-.268 2.849c-.145 1.569-.289 2.891-.31 2.952-.041.124-.475.166-.537.041v-.02zm-2.044-.227c-.041-.062-.186-1.321-.31-2.808l-.248-2.705.227-2.56c.124-1.403.248-2.746.268-2.952.062-.413.248-.578.434-.393.062.062.227 1.28.393 2.911l.289 2.808-.269 2.705c-.145 1.486-.31 2.787-.351 2.91-.103.228-.31.269-.434.104v-.02zm-2.085-.867c-.021-.083-.165-1.218-.289-2.498l-.248-2.333.268-2.374c.248-2.271.289-2.374.475-2.415.227-.042.206-.145.578 2.725l.268 2.146-.268 2.251c-.145 1.239-.31 2.333-.351 2.456-.104.248-.331.27-.393.042h-.04zm-1.92-1.735a27.33 27.33 0 01-.248-1.548l-.186-1.404.207-1.486c.103-.826.248-1.549.289-1.61.206-.248.351.145.557 1.61l.227 1.486-.227 1.486c-.124.826-.289 1.527-.351 1.569-.165.103-.227.083-.289-.083l.021-.02z"></path></svg>`,
	);
}

export default function generateLinkBlock({
	className,
	google,
	itunes,
	rss,
	soundcloud,
	spotify,
	youtube,
	twitch,
}) {
	return `
<div class="flex flex-row items-center ${className}">
	${[
		rss ? generateRssLink(rss) : null,
		itunes ? generateItunesLink(itunes.url) : null,
		spotify ? generateSpotifyLink(spotify) : null,
		youtube ? generateYoutubeLink(youtube) : null,
		google ? generateGoogleLink(google) : null,
		soundcloud ? generateSoundcloudLink(soundcloud) : null,
	]
		.filter(Boolean)
		.join("\n")}
</div>
`;
}
