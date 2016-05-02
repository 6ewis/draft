import {INITIALIZE} from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
   case INITIALIZE:
     console.log("I'm in the reducer and the data during initialization is: ", action.payload.data);
     return action.payload.data;
  }
  return state;
}
