import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {testButton, getNeoData, getFireballData, changeSlider} from '../actions/actions.js';
import moment from 'moment';
import {extendMoment} from 'moment-range';
import * as FontAwesome from 'react-icons/lib/fa'
import * as TiIconPack from 'react-icons/lib/ti'


const momentRange = extendMoment(moment);

class SliderBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 0
    }
  }

  componentDidMount() {
    this.props.getNeoData(this.props.currentDate);
    let e = 0;
    this.updateRange(e);
  }

  // updates the slider range max value
  updateRange(e){
    let startDate = 0;
    let endDate = 0;

    if(e){
      startDate = new Date(e.currentTarget.value, 0, 1);
      endDate = new Date(e.currentTarget.value, 11, 31);
    } else {
      startDate = new Date(this.getCurrentYear(), 0, 1);
      endDate = new Date(this.getCurrentYear(), 11, 31);
    }

    const range = (momentRange.range(startDate, endDate)).diff("days")+1;
    this.setState({range: range});
  }

  // updates the range slider with the current value tranlated to a date
  changeRange(e) {
    this.props.changeSlider(Number(e.currentTarget.value));
    this.props.getNeoData(moment().year(this.getCurrentYear()).dayOfYear(e.currentTarget.value).format('YYYY-MM-DD'));
  }

  // goes back one day in the current year timeline and updates the range slider value
  goBackOneDay() {
    if (this.props.currentDate !== `${this.getCurrentYear()}-01-01`) {
      this.props.changeSlider(Number(this.props.sliderData-1));
      this.props.getNeoData(moment(this.props.currentDate).subtract('1', 'days').format('YYYY-MM-DD'));
    }
  }
  // goes forward one day in the current year timeline and updates the range slider value
  goForwardOneDay() {
    if (this.props.currentDate !== `${this.getCurrentYear()}-12-31`) {
      this.props.changeSlider(Number(this.props.sliderData+1));
      this.props.getNeoData(moment(this.props.currentDate).add('1', 'days').format('YYYY-MM-DD'));
    }
  }
  // returns only the Year of the current date
  getCurrentYear() {
    return Number(moment(this.props.currentDate).format("YYYY"));
  }

  // value change for the select year dropdown menu
  changeYear(e) {
    const date = `${e.currentTarget.value}-01-01`;
    this.props.getNeoData(date);
    this.props.changeSlider(1);
    this.updateRange(e);
  }

  render() {

    const makeSlider = () => {
      return (
        <Fragment>
          <div className="range-slider">
            <div className="range-slider-date">
              <div className="range-button">
                <TiIconPack.TiArrowLeftOutline size={90} onClick={e => this.goBackOneDay()}/>
              </div>
              <div className="range-text">
                {moment(this.props.neoData[0].close_approach_data[0].close_approach_date).format("dddd, MMMM Do YYYY")}
              </div>
              <div className="range-button">
                <TiIconPack.TiArrowRightOutline size={90} onClick={e => this.goForwardOneDay()}/>
              </div>
            </div>
            <div className="range-year-picker">
              <select onChange={e => this.changeYear(e)} className="select">
                <option value="2015">2015</option>
                <option value="2016">2016</option>
              </select>
            </div>


            <ul className="range-slider-months">
              <li>Jan</li>
              <li>Feb</li>
              <li>Mar</li>
              <li>Apr</li>
              <li>May</li>
              <li>Jun</li>
              <li>Jul</li>
              <li>Aug</li>
              <li>Sep</li>
              <li>Oct</li>
              <li>Nov</li>
              <li>Dec</li>
            </ul>

            <input
              ref='sliderRef'
              type='range'
              min='1'
              max={this.state.range}
              step='1' value={this.props.sliderData}
              className='slider'
              onChange={e => this.changeRange(e)}>
            </input>
          </div>
        </Fragment>
      )
    }

    const rangeSlider = makeSlider();

    return (
      <Fragment>
        {rangeSlider}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {neoData: state.neoData, testState: state.testReducer, fireBallData: state.fireBallData, currentDate: state.currentDate,sliderData: state.sliderData }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testButton, //Usage: test('string to display');
    getNeoData, //Usage: getNeoData(YYYY-MM-DD) use 1990-01-01 to 1990-03-05
    getFireballData,
    changeSlider,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderBar);
