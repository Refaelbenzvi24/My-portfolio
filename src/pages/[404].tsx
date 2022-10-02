import pageNotFound from "../assets/page-not-found.svg"


export default () => {
	return (
		<section
			className="min-h-screen w-full bg-neutrals-900 flex py-20 items-center"
			aria-label="Page not found"
		>
			<div className="mx-auto w-10/12 2xl:w-[80%] h-full">
				<div className="flex items-center text-center flex-col z-10 relative">
					<div className={`
							font-display font-bold text-[12rem] lg:text-[16rem] text-neutrals-50 relative inline-block
							before:left-0.5 before:glitch-1-clip before:animate-glitch-1 before:content-['404'] before:absolute
							before:top-0 before:w-full before:h-full  after:-left-0.5 after:glitch-2-clip after:animate-glitch-2
							after:content-['404'] after:absolute after:top-0 after:w-full after:h-full after:bg-neutrals-900 before:bg-neutrals-900 before:h-[50%] after:h-[50%]`}>
						404
					</div>
					<h2 className="font-display font-bold text-brand md:text-xl uppercase mb-4 ">
						Page not found
					</h2>
					<h3
						className="font-display font-bold text-neutrals-50 text-4xl md:text-5xl mb-8 leading-tight md:leading-tight"
					>
						Whoops! Nothing here...
					</h3>
					<p className="text-neutrals-50 leading-relaxed max-w-prose mb-4">
						Let's rewind in time and get you...
					</p>
					<a
						className="text-lg text-neutrals-50 group inline-block items-center box-border border-b-[1px] border-b-neutrals-50 hover:border-transparent hover:text-brand transition-all duration-300"
						href="/"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="inline h-5 w-5 transition-all mb-[0.2rem] group-hover:opacity-100 opacity-0 duration-300 -ml-5 group-hover:ml-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"></path>
						</svg>
						back home
					</a>
				</div>
				<img
					src={pageNotFound}
					alt="Placeholder"
					className="absolute w-full left-0 top-1/2 -translate-y-1/2 opacity-60"
				/>
			</div>
		</section>
	)
}
