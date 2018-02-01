import * as types from './actionTypes';

export const testButton = (data) => ({
  type: types.TEST,
  payload: data
})

export const getNeoData = (year) => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve data...');
    //Usage: year = '1990-02-14' for sample
    fetch(`http://localhost:3001/api/neo/${year}`)
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received data from server');
        dispatch(loadNeoData(result));
        dispatch(setYear(year));
      },
      (error) => {
        console.log('Error getting data from server: ', error);
      }
      )
  }
}

export const getFireballData = () => {
  return (dispatch, getState) => {
    console.log('Attempting to retrieve fireball data...');
    fetch('http://localhost:3001/api/fireball')
      .then(res => res.json())
      .then(
      (result) => {
        console.log('Received fireball data from server');
        dispatch(loadFireballData(result))
      },
      (error) => {
        console.log('Error getting fireball data from server: ', error);
      }
      )
  }
}

export const setYear = (year) => ({
  type: types.YEAR,
  payload: year
})

export const loadFireballData = (data) => ({
  type: types.LOADFIREBALLDATA,
  payload: data
})

export const loadNeoData = (data) => ({
  type: types.LOADNEODATA,
  payload: data
})