import React, { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as utils from '../utils.js'
import ReactToPrint from 'react-to-print'
import Printpage from '../components/PrintPage'
import styles from '../style.js'

const Main = (data) => {
  const componentRef = useRef(null)

  return (
    <>
      <Head>
        <title>ARE Project - Hoek and Brown Criteria</title>
      </Head>
      <div style={styles.wrapper}>
        <h1 style={styles.main_heading}>Hoek and Brown Failure Criteria</h1>
        <div style={styles.input_container}>
          <h3 style={styles.subheading} id="sub2">
            Result
          </h3>
          <div style={styles.container}>
            <div style={styles.table}>
              <div style={styles.table_header}>
                <div style={styles.header__item}>Name</div>
                <div style={styles.header__item}>Without σ3</div>
                {data.data.σ3 && <div style={styles.header__item}>With σ3</div>}
              </div>
              <div style={styles.table_content}>
                <div style={styles.table_row} id="even">
                  <div style={styles.table_data}>
                    Cohesion of Rock mass [Cm] (MPa)
                  </div>
                  <div style={styles.table_data}>{data.data.crm}</div>
                  {data.data.σ3 && (
                    <div style={styles.table_data}>{data.data.cm3}</div>
                  )}
                </div>
                <div style={styles.table_row} id="odd">
                  <div style={styles.table_data}>
                    Friction angle of Rock mass
                  </div>
                  <div style={styles.table_data}>{data.data.frm}°</div>
                  {data.data.σ3 && (
                    <div style={styles.table_data}>{data.data.phim3}°</div>
                  )}
                </div>
                <div style={styles.table_row} id="even">
                  <div style={styles.table_data}>UCS of Rock mass (MPa)</div>
                  <div style={styles.table_data}>{data.data.ucs}</div>
                  {data.data.σ3 && (
                    <div style={styles.table_data}>{data.data.ucs}</div>
                  )}
                </div>
                <div style={styles.table_row} id="odd">
                  <div style={styles.table_data}>
                    Rock mass deformation [E<sub>rm</sub>] (MPa)
                  </div>
                  <div style={styles.table_data}>{data.data.erm}</div>
                  {data.data.σ3 && (
                    <div style={styles.table_data}>{data.data.erm}</div>
                  )}
                </div>
                <div style={styles.table_row} id="even">
                  <div style={styles.table_data}>Tensile Strength (MPa)</div>
                  <div style={styles.table_data}>{data.data.tens}</div>
                  {data.data.σ3 && (
                    <div style={styles.table_data}>{data.data.tens}</div>
                  )}
                </div>
              </div>
            </div>
            <div style={styles.buttons}>
              <button className="next_button" onClick={data.data.clickHandler}>
                Modify Values
              </button>
              <button className="next_button" onClick={data.data.newvalues}>
                Enter New Values
              </button>
              <ReactToPrint
                trigger={() => <button className="next_button">Print</button>}
                content={() => componentRef.current}
                documentTitle="Hoek and Brown Criteria"
              />
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <Printpage data={data.data} ref={componentRef} />
          </div>
          <style jsx>{`
            .next_button {
              border-radius: 15px;
              background-color: #7e5b5b;
              box-sizing: border-box;
              display: flex;
              justify-content: space-around;
              align-items: center;
              color: white;
              font-size: 1rem;
              border: none;
              box-shadow: 0px 4px 4px 0 #00000025;
              padding: 5px 1.5rem;
              cursor: pointer;
            }
            .next_button:hover {
              background-color: #7e5b5b98;
              box-shadow: '0px 4px 4px 0 #00000025';
            }
            #sub2 {
              font-size: 2.2rem !important;
            }
            #even {
              background-color: #ffd1d1;
            }
            #odd {
              background-color: #ffe0e0;
            }
          `}</style>
        </div>
      </div>
    </>
  )
}

const Output = () => {
  const router = useRouter()
  const props = router.query
  const clickHandler = () => {
    router.replace({
      pathname: '/home',
      query: props,
    })
  }
  const newvalues = () => {
    router.replace('/home')
  }

  const mb = utils.calculateMb(props.m_i, props.gsi, props.D)
  const a = utils.calculateA(props.gsi)
  const s = utils.calulateS(props.gsi, props.D)
  const scm = utils.calculateScm(props.σci, mb, s, a)
  const sinsitu = (props.uw * props.d) / 1000

  let s3max = 0

  if (props.application === 'slope') {
    s3max = utils.calculateS3MaxSlope(scm, sinsitu)
  } else {
    s3max = utils.calculateS3MaxTunnel(scm, sinsitu)
  }

  const s3 = utils.calculateS3n(s3max, props.σci)
  let phim3 = 0,
    cm3 = 0
  if (props.σ3) {
    phim3 = utils.calculatePHIWithS3(a, mb, props.σ3, props.σci, s).toFixed(4)
    cm3 = utils
      .calculateCohesionWithS3(props.σ3, props.σci, mb, a, s, phim3)
      .toFixed(4)
  }

  const crm = utils.calculateCohesion(s3, props.σci, mb, s, a).toFixed(4)
  const frm = utils.calculatePHI(s3, mb, s, a).toFixed(4)
  const ucs = utils.calculateScm(props.σci, mb, s, a).toFixed(4)
  let erm = 0
  if (props.E_i) {
    erm = utils.calculateErm(props.D, props.gsi, props.E_i).toFixed(4)
  } else {
    erm = utils.calculateErmWithoutEi(props.D, props.gsi).toFixed(4)
  }

  const tens = utils.calculateTensileStress(props.σci, props.m_i).toFixed(4)
  const output_data = {
    crm: crm,
    frm: frm,
    ucs: ucs,
    erm: erm,
    tens: tens,
    phim3: phim3,
    cm3: cm3,
    clickHandler: clickHandler,
    newvalues: newvalues,
    ...props,
  }

  return <Main data={output_data} />
}

export default Output
