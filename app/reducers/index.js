import { combineReducers } from 'redux';

import currencies from './currencies';
import theme from './theme.js';

export default combineReducers({
  currencies,
  theme,
});
