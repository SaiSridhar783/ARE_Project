import React, { useReducer } from "react";
import Head from "next/head";
import TextInput from "../components/TextInput";
import { useRouter } from "next/dist/client/router";

const formReducer = (state, action) => {
	switch (action.type) {
		case "SET_TEXT":
			return {
				...state,
				[action.name]: action.value,
			};
		default:
			return state;
	}
};

function Home() {
	const router = useRouter();
	const { query } = router;

	const initialState = {
		σci: query.σci || "",
		m_i: query.m_i || "",
		D: query.D || "",
		E_i: query.E_i || "",
		σ3: query.σ3 || "",
		gsi: query.gsi || "",
		application: query.application || "",
	};

	const [formState, dispatch] = useReducer(formReducer, initialState);

	const submitHandler = (e) => {
		e.preventDefault();
		router.push({
			pathname: "/output",
			query: formState,
		});
	};

	const onChangeText = (e) => {
		const { name, value } = e.target;
		dispatch({ type: "SET_TEXT", value, name });
	};

	return (
		<>
			<Head>
				<title>ARE Project - Hoek and Brown Criteria</title>
			</Head>
			<div className="wrapper">
				<h1 className="main-heading">
					Hoek and Brown Failure Criteria
				</h1>
				<form className="input-container" onSubmit={submitHandler}>
					<h3 className="subheading">Fill the details below</h3>
					<div className="inputs-wrapper">
						<div className="sub-input-wrapper">
							<TextInput
								label="UCS of intact rock (MPa)"
								required
								onChangeText={(e) => onChangeText(e)}
								name="σci"
								id="σci"
								value={formState.σci}
							>
								[σ<sub>ci</sub>]
							</TextInput>
							<TextInput
								label="Intact Property of rock"
								required
								onChangeText={(e) => onChangeText(e)}
								name="m_i"
								id="m_i"
								value={formState.m_i}
							>
								[m<sub>i</sub>]
							</TextInput>
							<TextInput
								label="Geological Strength Index [GSI]"
								required
								onChangeText={(e) => onChangeText(e)}
								name="gsi"
								id="gsi"
								value={formState.gsi}
							/>
						</div>
						<div className="sub-input-wrapper">
							<TextInput
								label="Distubance Factor [D]"
								required
								onChangeText={(e) => onChangeText(e)}
								name="D"
								id="D"
								value={formState.D}
							/>
							<TextInput
								label="Intact Rock Deformation Modulus (MPa)"
								onChangeText={(e) => onChangeText(e)}
								name="E_i"
								id="E_i"
								value={formState.E_i}
							>
								[E<sub>i</sub>]
							</TextInput>
							<TextInput
								label="Confining Stress (MPa)"
								onChangeText={(e) => onChangeText(e)}
								name="σ3"
								id="σ3"
								value={formState.σ3}
							>
								[σ<sub>3</sub>]
							</TextInput>
						</div>
					</div>
					<div className="radio-container">
						<h4>Choose the Application: </h4>
						<div className="radio-group">
							<label htmlFor="tunnel">Deep Tunnels</label>
							<input
								type="radio"
								id="tunnel"
								value="tunnel"
								name="application"
								required
								onChange={(e) => onChangeText(e)}
							/>
						</div>
						<div className="radio-group">
							<label htmlFor="slope">Slope</label>
							<input
								type="radio"
								id="slope"
								value="slope"
								name="application"
								required
								onChange={(e) => onChangeText(e)}
							/>
						</div>
					</div>
					<button className="next-button" type="submit">
						Next
						<img
							src="/images/Arrow.png"
							alt="next"
							className="arrow"
						/>
					</button>
				</form>
			</div>
		</>
	);
}

export default Home;