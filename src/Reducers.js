import { combineReducers } from 'redux';
import { user, sites } from './Welcome/reducers';
import { regions, countries } from './Header/reducers';

export default combineReducers({
  user,
  sites,
  regions,
  countries
});
