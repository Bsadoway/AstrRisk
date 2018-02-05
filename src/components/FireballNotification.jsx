import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { spring, Motion, StaggeredMotion, TransitionMotion, presets } from 'react-motion';
import moment from 'moment';
import * as d3 from 'd3';

class FireballNotification extends Component {

  render() {
    const { currentDate, fireBallData } = this.props;
    const year = moment(currentDate).format('YYYY');

    const fbPosition = [];

    for(let date in fireBallData) {
      const fbYear = moment(date).format("YYYY");
      if (fbYear === year) {
        fbPosition.push(moment(date).dayOfYear());
      }
    }

    var color = d3.scaleOrdinal(d3['schemeCategory20'])

    const xScale = d3.scaleLinear().domain([0,365]).range([0,1200])

    const sliderAlert = (
      fbPosition.map(position => (
        <circle cx={xScale(position)} cy={0} r={2} key={Math.floor(Math.random() * 800)} stroke={'#d1170a'} fill={'#d1170a'} fillOpacity={0.7} />
      ))
    )

    return (
      <Fragment>
        <div className="fireball-slider-notification">
          <svg width={1200} height={26}>
            <g transform={"translate(" + 0 + "," + 10 + ")"}>
              {sliderAlert}
              </g>
          </svg>
        </div>
      </Fragment>
    )

  }
}

function mapStateToProps(state) {
  return {
    neoData: state.neoData,
    currentDate: state.currentDate,
    fireBallData: state.fireBallData
  }
}

export default connect(mapStateToProps)(FireballNotification);
