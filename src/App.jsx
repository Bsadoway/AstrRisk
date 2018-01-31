import React, {Component} from 'react';
import EarthSystem from './components/EarthSystem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testButton, getNeoData } from './actions/actions.js';
import * as d3 from 'd3';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);


  }



  render() {

    const scaleTime = d3.scaleTime().domain([new Date(1990, 0, 1), new Date(1990, 2, 5)]).range([1,63]); // domain is the date range, range should match the slider min/max

    return (<div>
      <h1>ASTRRISK</h1>
      <EarthSystem neodata={this.state}/>
      <input
        type='range'
        min='1'
        max='63'
        step='1'
        onChange={e => this.props.getNeoData(moment(scaleTime.invert(e.currentTarget.value)).format('YYYY-MM-DD'))}>
      </input>
    </div>);
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
    testButton, //Usage: test('string to display');
    getNeoData  //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
