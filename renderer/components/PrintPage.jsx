import React from 'react'

const Printpage = React.forwardRef((props, ref) => {
	console.log(props)
  return (
    <div className="container2" ref={ref}>
      <h3 className="subheading" id="sub2" style={{ marginTop: '-1px' }}>
        Input
      </h3>
      <div className="table">
        <div className="table-header">
          <div className="header__item">Name</div>
          <div className="header__item">Values</div>
        </div>
        <div className="table-content">
          <div className="table-row">
            <div className="table-data">UCS of intact rock (MPa)</div>
            <div className="table-data">{props.data.σci}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Intact Property of rock</div>
            <div className="table-data">{props.data.m_i}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Geological Strength Index [GSI]</div>
            <div className="table-data">{props.data.gsi}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Unit weight of overburden</div>
            <div className="table-data">{props.data.uw}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Distubance Factor [D]</div>
            <div className="table-data">{props.data.D}</div>
          </div>
          <div className="table-row">
            <div className="table-data">
              Intact Rock Deformation Modulus (MPa)
            </div>
            <div className="table-data">{props.data.E_i}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Confining Stress (MPa)</div>
            <div className="table-data">{props.data.σ3}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Depth from surface(m)</div>
            <div className="table-data">{props.data.d}</div>
          </div>
          <div className="table-row">
            <div className="table-data">Method</div>
            <div className="table-data">1</div>
          </div>
        </div>
      </div>
      <h3 className="subheading" id="sub2" style={{ marginTop: '50px' }}>
        Output
      </h3>
      <div className="table">
        <div className="table-header">
          <div className="header__item">Name</div>
          <div className="header__item">Without σ3</div>
          {props.data.σ3 && <div className="header__item">With σ3</div>}
        </div>
        <div className="table-content">
          <div className="table-row">
            <div className="table-data">Cohesion of Rock mass[Cm]</div>
            <div className="table-data">1</div>
            {props.data.σ3 && <div className="table-data">0</div>}
          </div>
          <div className="table-row">
            <div className="table-data">Friction angle of Rock mass</div>
            <div className="table-data">2</div>
            {props.data.σ3 && <div className="table-data">1</div>}
          </div>
          <div className="table-row">
            <div className="table-data">UCS of Rock mass</div>
            <div className="table-data">3</div>
            {props.data.σ3 && <div className="table-data">2</div>}
          </div>
          <div className="table-row">
            <div className="table-data">Rock mass deformation</div>
            <div className="table-data">4</div>
            {props.data.σ3 && <div className="table-data">2</div>}
          </div>
          <div className="table-row">
            <div className="table-data">Tensile Strength</div>
            <div className="table-data">5</div>
            {props.data.σ3 && <div className="table-data">2</div>}
          </div>
        </div>
      </div>
    </div>
  )
})

export default Printpage
