
import { combineReducers } from 'redux';
import usersReducer from './authReducers';

const rootReducer = combineReducers({
  user: usersReducer,
 
});

export default rootReducer;