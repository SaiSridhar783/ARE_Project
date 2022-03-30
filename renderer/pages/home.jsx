import React, { useReducer } from 'react'
import Head from 'next/head'
import TextInput from '../components/TextInput'
import { useRouter } from 'next/dist/client/router'
import styles from '../style'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return {
        ...state,
        [action.name]: action.value,
      }
    default:
      return state
  }
}

function Home() {
  const router = useRouter()
  const { query } = router

  const initialState = {
    σci: query.σci || '',
    m_i: query.m_i || '',
    D: query.D || '',
    E_i: query.E_i || '',
    σ3: query.σ3 || '',
    gsi: query.gsi || '',
    application: query.application || '',
    d: query.d || '',
    uw: query.uw || '',
  }

  const [formState, dispatch] = useReducer(formReducer, initialState)

  const submitHandler = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/output',
      query: formState,
    })
  }

  const onChangeText = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_TEXT', value, name })
  }

  return (
    <>
      <Head>
        <title>ARE Project - Hoek and Brown Criteria</title>
      </Head>
      <div style={styles.wrapper}>
        <h1 style={styles.main_heading}>Hoek and Brown Failure Criteria</h1>
        <form style={styles.input_container} onSubmit={submitHandler}>
          <h3 className="subheading">Fill the details below</h3>
          <div className="inputs-wrapper">
            <div style={styles.sub_input_wrapper} className="sub-input-wrapper">
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
            <h4 style={{ fontFamily: 'PT Sans' }}>Choose the Application: </h4>
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
          <button className="next_button" type="submit">
            Next
            <img src="/images/Arrow.png" alt="next" style={styles.arrow} />
          </button>
        </form>
        <style jsx>{`
          .next_button {
            border-radius: 15px;
            background-color: #7e5b5b;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: white;
            font-size: 24px;
            border: none;
            box-shadow: 0px 4px 4px 0 #00000025;
            padding: 5px 1.5rem;
			cursor: pointer;
          }
          .next_button:hover {
            background-color: #7e5b5b98;
            box-shadow: '0px 4px 4px 0 #00000025';
          }

          .required {
            color: red;
            font-size: 1.5rem;
            margin-left: 2px;
          }

          .subheading {
            font-size: 1.55rem;
            font-weight: lighter;
            text-align: center;
            text-shadow: 0px 3px 4px #00000060;
            margin: 0;
            margin-bottom: 20px;
            font-family: 'PT Sans';
          }
          .inputs-wrapper {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }

          @media (max-width: 900px) {
            .subheading {
              margin-bottom: 20px;
            }
            .inputs-wrapper {
              flex-direction: column;
            }
            .field-container {
              width: 150%;
            }
          }

          @media (min-width: 1080px) {
            .inputs-wrapper {
              gap: 5rem;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default Home
