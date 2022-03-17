import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const Output = (props) => {
	const router = useRouter();
	const clickHandler = () => {
		router.replace({
			pathname: "/home",
			query: props,
		});
	};

	return (
		<>
			<Head>
				<title>ARE Project - Hoek and Brown Criteria</title>
			</Head>
			<div>
				Bankai
				{JSON.stringify(props, null, 3)}
			</div>
			<button onClick={clickHandler}>Go to home page</button>
		</>
	);
};

export function getServerSideProps(ctx) {
	return {
		props: {
			...ctx.query,
		},
	};
}

export default Output;
