import React, { useReducer } from "react";
import Head from "next/head";
import TextInput from "../components/TextInput";
import { useRouter } from "next/dist/client/router";
import styles from "../style";

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
		d: query.d || "",
		uw: query.uw || "",
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
			<div style={styles.wrapper}>
				<h1 style={styles.main_heading}>
					Hoek and Brown Failure Criteria
				</h1>
				<form style={styles.input_container} onSubmit={submitHandler}>
					<h3 style={styles.subheading}>Fill the details below</h3>
					<div style={styles.inputs_wrapper}>
						<div style={styles.sub_input_wrapper}>
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
								max={38}
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
							<TextInput
								label="Depth from Surface (m)"
								required
								onChangeText={(e) => onChangeText(e)}
								name="d"
								id="d"
								value={formState.d}
							/>
						</div>
						<div style={styles.sub_input_wrapper}>
							<TextInput
								label="Distubance Factor [D]"
								required
								onChangeText={(e) => onChangeText(e)}
								name="D"
								id="D"
								value={formState.D}
								max={1}
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
							<TextInput
								label="Unit Weight of Overburden"
								onChangeText={(e) => onChangeText(e)}
								name="uw"
								id="uw"
								value={formState.uw}
								required
							>
								[kN/m<sup>3</sup>]
							</TextInput>
						</div>
					</div>
					<div style={styles.radio_container}>
						<h4>Choose the Application: </h4>
						<div style={styles.radio_group}>
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
						<div style={styles.radio_group}>
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
					<button style={styles.next_button} type="submit">
						Next
						<img
							src="/images/Arrow.png"
							alt="next"
							style={styles.arrow}
						/>
					</button>
				</form>
			</div>
		</>
	);
}

export default Home;
