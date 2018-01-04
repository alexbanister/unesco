import { combineReducers } from 'redux';
import { user, sites } from './Welcome/reducers';

export default combineReducers({
  user,
  sites
});
