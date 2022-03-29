import React, { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as utils from "../utils.js";
import ReactToPrint from "react-to-print";
import Printpage from "../components/print.jsx";

const Main = (data) => {
	return (
		<>
			<Head>
				<title>ARE Project - Hoek and Brown Criteria</title>
			</Head>
			<div className="wrapper">
				<h1 className="main-heading">
					Hoek and Brown Failure Criteria
				</h1>
				<div className="input-container">
					<h3 className="subheading" id="sub2">
						Result
					</h3>
					<div className="container">
						<div className="table">
							<div className="table-header">
								<div className="header__item">Name</div>
								<div className="header__item">Without σ3</div>
								{data.data.σ3 && (
									<div className="header__item">With σ3</div>
								)}
							</div>
							<div className="table-content">
								<div className="table-row" id="even">
									<div className="table-data">
										Cohesion of Rock mass[Cm]
									</div>
									<div className="table-data">
										{data.data.crm}
									</div>
									{data.data.σ3 && (
										<div className="table-data">
											{data.data.cm3}
										</div>
									)}
								</div>
								<div className="table-row" id="odd">
									<div className="table-data">
										Friction angle of Rock mass
									</div>
									<div className="table-data">
										{data.data.frm}°
									</div>
									{data.data.σ3 && (
										<div className="table-data">
											{data.data.phim3}°
										</div>
									)}
								</div>
								<div className="table-row" id="even">
									<div className="table-data">
										UCS of Rock mass
									</div>
									<div className="table-data">
										{data.data.ucs}
									</div>
									{data.data.σ3 && (
										<div className="table-data">
											{data.data.ucs}
										</div>
									)}
								</div>
								<div className="table-row" id="odd">
									<div className="table-data">
										Rock mass deformation
									</div>
									<div className="table-data">
										{data.data.erm}
									</div>
									{data.data.σ3 && (
										<div className="table-data">
											{data.data.erm}
										</div>
									)}
								</div>
								<div className="table-row" id="even">
									<div className="table-data">
										Tensile Strength
									</div>
									<div className="table-data">
										{data.data.tens}
									</div>
									{data.data.σ3 && (
										<div className="table-data">
											{data.data.tens}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="buttons">
						<button
							className="next-button"
							onClick={data.data.clickHandler}
						>
							Modify Values
						</button>
						<button
							className="next-button"
							onClick={data.data.newvalues}
						>
							Enter New Values
						</button>
						<ReactToPrint
							trigger={() => (
								<button className="next-button">Print</button>
							)}
							content={() => data.data.componentRef.current}
						/>
					</div>
					<div style={{ display: "none" }}>
						<Printpage
							data={data.data}
							ref={data.data.componentRef}
						/>
					</div>
					<style jsx>
						{".next-button {font-size: 1rem;margin:0 2%;}"}
					</style>
				</div>
			</div>
		</>
	);
};

const Output = (props) => {
	let componentRef = useRef(null);
	const router = useRouter();
	const clickHandler = () => {
		router.replace({
			pathname: "/home",
			query: props,
		});
	};
	const newvalues = () => {
		router.replace("/home");
	};

	const mb = utils.calculateMb(props.m_i, props.gsi, props.D);
	const a = utils.calculateA(props.gsi);
	const s = utils.calulateS(props.gsi, props.D);
	const scm = utils.calculateScm(props.σci, mb, s, a);
	const sinsitu = props.uw * props.d;

	let s3max = 0;

	if (props.application === "slope") {
		s3max = utils.calculateS3MaxSlope(scm, sinsitu);
	} else {
		s3max = utils.calculateS3MaxTunnel(scm, sinsitu);
	}

	const s3 = utils.calculateS3n(s3max, props.σci);
	let phim3 = 0,
		cm3 = 0;
	if (props.σ3) {
		phim3 = utils
			.calculatePHIWithS3(a, mb, props.σ3, props.σci, s)
			.toFixed(4);
		cm3 = utils
			.calculateCohesionWithS3(props.σ3, props.σci, mb, a, s, phim3)
			.toFixed(4);
	}

	const crm = utils.calculateCohesion(s3, props.σci, mb, s, a).toFixed(4);
	const frm = utils.calculatePHI(s3, mb, s, a).toFixed(4);
	const ucs = utils.calculateScm(props.σci, mb, s, a).toFixed(4);
	let erm = 0;
	if (props.E_i) {
		erm = utils.calculateErm(props.D, props.gsi, props.E_i).toFixed(4);
	} else {
		erm = utils.calculateErmWithoutEi(props.D, props.gsi).toFixed(4);
	}

	const tens = utils.calculateTensileStress(props.σci, props.m_i).toFixed(4);
	const output_data = {
		crm: crm,
		frm: frm,
		ucs: ucs,
		erm: erm,
		tens: tens,
		phim3: phim3,
		cm3: cm3,
		componentRef: componentRef,
		clickHandler: clickHandler,
		newvalues: newvalues,
		...props,
	};

	return <Main data={output_data} />;
};

export function getServerSideProps(ctx) {
	return {
		props: {
			...ctx.query,
		},
	};
}

export default Output;
