import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData, getFireballData } from '../actions/actions.js';
import * as Material from 'react-icons/lib/md'

// spawnFireball() {

// }

class FireballAlert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
      <div className="alertContainer">
          <Material.MdWarning size={90} className="alert"/>
      </div>
      </Fragment>
    )
  }
}

export default FireballAlert;