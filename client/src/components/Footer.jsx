import React from "react";

const Footer = () => {
	return (
		<footer className="top-[100vh] sticky">
			<div className="flex justify-center h-5 items-center pt-8 px-5 flex-wrap-reverse text-sm  md:justify-between lg:justify-between ">
				<div className="flex justify-center flex-wrap items-center gap-2 md:text-md md:justify-between lg:justify-between xl:justify-center lg:flex-row">
					<div className="flex flex-wrap">© CozyHaven, Inc.</div>
					<ul className="flex gap-2">
						<li className="cursor-pointer">Privacy</li>
						<span>·</span>
						<li className="cursor-pointer">Terms</li>
						<span>·</span>
						<li className="cursor-pointer">Sitemap</li>
						<span>·</span>
						<li className="cursor-pointer">Company Details</li>
					</ul>
				</div>
				<div className="flex gap-5 font-semibold md:mb-2 ">
					<div className="flex flex-nowrap gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
							/>
						</svg>
						English (IN)
					</div>
					<div className="flex flex-wrap">₹ INR</div>
					<div className="flex gap-3 flex-wrap">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentcolor"
							aria-hidden="true"
							display="block"
							className="w-6 h-6 cursor-pointer"
							viewBox="0 0 32 32"
						>
							<path d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
							<path
								fill="#fff"
								d="M22.94 16H18.5v-3c0-1.27.62-2.5 2.6-2.5h2.02V6.56s-1.83-.31-3.58-.31c-3.65 0-6.04 2.21-6.04 6.22V16H9.44v4.62h4.06V32h5V20.62h3.73z"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentcolor"
							aria-hidden="true"
							display="block"
							className="w-6 h-6 cursor-pointer"
							viewBox="0 0 25 25"
						>
							<path d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
							<path
								fill="#fff"
								d="M14.095 10.316 22.286 1h-1.94L13.23 9.088 7.551 1H1l8.59 12.231L1 23h1.94l7.51-8.543L16.45 23H23zm-2.658 3.022-.872-1.218L3.64 2.432h2.98l5.59 7.821.869 1.219 7.265 10.166h-2.982z"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentcolor"
							aria-hidden="true"
							display="block"
							className="w-6 h-6 cursor-pointer"
							viewBox="0 0 32 32"
						>
							<path d="M30 0H2a2 2 0 0 0-2 2v28c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2" />
							<path
								fill="#fff"
								d="M15.71 4h1.25c2.4 0 2.85.02 3.99.07 1.28.06 2.15.26 2.91.56.79.3 1.46.72 2.13 1.38.6.6 1.08 1.33 1.38 2.13l.02.06c.28.74.48 1.58.54 2.8l.01.4c.05 1.02.06 1.63.06 4.4v.92c0 2.6-.02 3.05-.07 4.23a8.8 8.8 0 0 1-.56 2.91c-.3.8-.77 1.53-1.38 2.13a5.9 5.9 0 0 1-2.13 1.38l-.06.02c-.74.28-1.59.48-2.8.53l-.4.02c-1.02.05-1.63.06-4.4.06h-.92a73 73 0 0 1-4.23-.07 8.8 8.8 0 0 1-2.91-.56c-.8-.3-1.53-.77-2.13-1.38a5.9 5.9 0 0 1-1.38-2.13l-.02-.06a8.8 8.8 0 0 1-.54-2.8l-.01-.37A85 85 0 0 1 4 16.29v-1c0-2.62.02-3.06.07-4.24.06-1.26.26-2.13.55-2.88l.01-.03c.3-.8.77-1.53 1.38-2.13a5.9 5.9 0 0 1 2.13-1.38l.06-.02a8.8 8.8 0 0 1 2.8-.54l.37-.01C12.39 4 12.99 4 15.71 4m.91 2.16h-1.24c-2.3 0-2.91.01-3.81.05l-.42.02c-1.17.05-1.8.25-2.23.41-.56.22-.96.48-1.38.9-.4.41-.67.8-.88 1.35l-.03.06a6.7 6.7 0 0 0-.4 2.2l-.02.45c-.04.9-.05 1.53-.05 3.94v1.08c0 2.64.02 3.05.07 4.23v.07c.06 1.13.25 1.74.42 2.16.21.56.47.96.9 1.38.4.4.8.67 1.34.88l.06.03a6.7 6.7 0 0 0 2.2.4l.45.02c.9.04 1.53.05 3.94.05h1.08c2.64 0 3.05-.02 4.23-.07h.07a6.5 6.5 0 0 0 2.16-.42c.52-.19.99-.5 1.38-.9.4-.4.67-.8.88-1.34l.03-.06a6.7 6.7 0 0 0 .4-2.2l.02-.45c.04-.9.05-1.53.05-3.94v-1.09c0-2.63-.02-3.04-.07-4.22v-.07a6.5 6.5 0 0 0-.42-2.16c-.19-.52-.5-.99-.9-1.38a3.7 3.7 0 0 0-1.34-.88l-.06-.03a6.6 6.6 0 0 0-2.16-.4l-.46-.02c-.9-.04-1.5-.05-3.8-.05zM16 9.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32M16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8m6.4-3.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88"
							/>
						</svg>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
