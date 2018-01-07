import { combineReducers } from 'redux';
import { user, sites } from './Welcome/reducers';
import { regions, countries } from './Header/reducers';
import { search } from './Search/reducers';

export default combineReducers({
  user,
  sites,
  regions,
  countries,
  search
});
