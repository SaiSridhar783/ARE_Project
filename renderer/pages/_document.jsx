import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html style={{ margin: 0, padding: 0 }} className="main-body">
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				></link>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<body style={{ margin: 0, padding: 0 }} className="main-body">
				<Main />
				<NextScript />
				<style jsx>
					{`
						.main-body::-webkit-scrollbar {
							display: none;
						}
					`}
				</style>
			</body>
		</Html>
	);
}
