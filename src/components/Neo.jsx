import React, {Component, Fragment} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Neo extends Component {
  constructor() {
    super();
    this.state = {
      showPopUP: false
    }
  }

  componentDidMount() {
  }

  togglePopUp() {
    this.setState({ showPopUP: !this.state.showPopUP });
  }

  render() {

    const { distance, avgDiameter, speed, hazard } = this.props;
    let { name } = this.props;
    const neoName = name;
    // Formula for 
    const volume = (4/3) * Math.PI * Math.pow((avgDiameter / 2), 3);
    // console.log('volume: ', volume)
    const mass = 2000 * volume;
    // console.log('mass: ', mass)
    const ke = 0.5 * mass * Math.pow(speed, 2);
    // console.log('ke: ', ke)
    const kt = +(ke * 0.00000000023901).toFixed(2);

    const tScale = d3.scaleLinear().domain([0, 20000]).range([50, 8]);
    const time = tScale(speed);
    name = "A" + name.replace(/\s/g, '').replace(/[{()}]/g, '');
    const dScale = d3.scaleLinear().domain([6371, 54600000]).range([280, 1400]);
    const sizeScale = d3.scaleLinear().domain([])
    const scaledDistance = Math.floor(dScale(distance));
    const keyframes = `@keyframes ${name} {
        0% {
            transform: rotateZ(0deg) translateX(${scaledDistance / 2}px) rotateZ(0deg) rotateX(0deg);
        }
        100% {
            transform: rotateZ(360deg) translateX(${scaledDistance / 2}px) rotateZ(-360deg) rotateX(0deg);
        }    
      }`;

    const newclass = `.${name} {
        position: absolute;
        width: 80px;
        height: 106px;
        left: 660px;
        top: 644px;
        cursor: pointer;
        padding: 20px;
        animation: ${name} ${speed*2}s infinite linear;
      }`;

    const hoverpause = `.${name}:hover {
        animation-play-state: paused;
      }`

    // Generates orbit outline based on miss distance of NEO
    const orbitStyle = {
      borderRadius: "50%",
      position: "absolute",
      left: `${700 - (scaledDistance / 2)}px`,
      top: `${700 - (scaledDistance / 2)}px`,
      width: `${scaledDistance}px`,
      height: `${scaledDistance}px`,
      border: "dashed 2px #ccc",
      marginLeft: "auto",
      marginRight: "auto",
      zIndex: "-40",
      opacity: "0.6",
    }

    const createNeo = () => {
      return (<Fragment>
        <div style={orbitStyle}></div>
        <img src='../../public/assets/images/neo.svg' onClick={e => this.togglePopUp()} className={name} />
      </Fragment>
      )
    }

    const nearEarthObject = createNeo();
    document.styleSheets[0].insertRule(keyframes, document.styleSheets[0].cssRules.length)
    document.styleSheets[0].insertRule(newclass, document.styleSheets[0].cssRules.length)
    document.styleSheets[0].insertRule(hoverpause, document.styleSheets[0].cssRules.length)

    const createPopUp = () => {
      return (
        <div className="infoPopupContainer" onClick={e => this.togglePopUp()}>
          <div className="infoPopup-infoHolder">
            <div className="infoText">
              <div className="infoText-name">{neoName}</div>
              <div className="infoText-line-item"><span>Estimated diameter:</span> <span>{avgDiameter} m</span></div>
              <div className="infoText-line-item"><span>Is potentially hazardous:</span> <span>{hazard}</span></div>
              <div className="infoText-line-item"><span>Relative velocity:</span> <span>{Math.floor(speed * 1000)} m/s</span></div>
              <div className="infoText-line-item"><span>Miss distance:</span> <span>{distance} km</span></div>
              <div className="infoText-line-item"><span>Energy (Megatons):</span> <span>{kt} Mt</span></div>
            </div>
            <div className="infoImage-container">
              <img src='../../public/assets/images/neo.svg' className="infoPopup-image" />
            </div>
          </div>
        </div>
      )
    }

    const popUp = createPopUp();

    return (
      <Fragment>
        {nearEarthObject}
        {this.state.showPopUP && popUp}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    testState: state.testReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Neo);


