import React from 'react'
import styles from '../style'

const Printpage = React.forwardRef((props, ref) => {
	console.log(props)
  return (
    <div style={styles.container2} ref={ref}>
      <h3 style={{...styles.subheading, marginTop: '-1px'}} id="sub2" >
        Input
      </h3>
      <div style={styles.table}>
        <div style={styles.table_header}>
          <div style={styles.header__item}>Name</div>
          <div style={styles.header__item}>Values</div>
        </div>
        <div style={styles.table_content}>
          <div style={styles.table_row}>
            <div style={styles.table_data}>UCS of intact rock (MPa)</div>
            <div style={styles.table_data}>{props.data.σci}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Intact Property of rock</div>
            <div style={styles.table_data}>{props.data.m_i}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Geological Strength Index [GSI]</div>
            <div style={styles.table_data}>{props.data.gsi}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Unit weight of overburden</div>
            <div style={styles.table_data}>{props.data.uw}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Distubance Factor [D]</div>
            <div style={styles.table_data}>{props.data.D}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>
              Intact Rock Deformation Modulus (MPa)
            </div>
            <div style={styles.table_data}>{props.data.E_i}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Confining Stress (MPa)</div>
            <div style={styles.table_data}>{props.data.σ3}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Depth from surface(m)</div>
            <div style={styles.table_data}>{props.data.d}</div>
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Method</div>
            <div style={styles.table_data}>1</div>
          </div>
        </div>
      </div>
      <h3 style={{...styles.subheading, marginTop: '50px'}} id="sub2" >
        Output
      </h3>
      <div style={styles.table}>
        <div style={styles.table_header}>
          <div style={styles.header__item}>Name</div>
          <div style={styles.header__item}>Without σ3</div>
          {props.data.σ3 && <div style={styles.header__item}>With σ3</div>}
        </div>
        <div style={styles.table_content}>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Cohesion of Rock mass[Cm]</div>
            <div style={styles.table_data}>1</div>
            {props.data.σ3 && <div style={styles.table_data}>0</div>}
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Friction angle of Rock mass</div>
            <div style={styles.table_data}>2</div>
            {props.data.σ3 && <div style={styles.table_data}>1</div>}
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>UCS of Rock mass</div>
            <div style={styles.table_data}>3</div>
            {props.data.σ3 && <div style={styles.table_data}>2</div>}
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Rock mass deformation</div>
            <div style={styles.table_data}>4</div>
            {props.data.σ3 && <div style={styles.table_data}>2</div>}
          </div>
          <div style={styles.table_row}>
            <div style={styles.table_data}>Tensile Strength</div>
            <div style={styles.table_data}>5</div>
            {props.data.σ3 && <div style={styles.table_data}>2</div>}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Printpage
