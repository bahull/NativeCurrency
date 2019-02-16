import {
  takeEvery, select, call, put,
} from 'redux-saga/effects';

// 1. Swap currency
// 2. Base currency changed
// 3. Upon Initial App Load

import {
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_ERROR,
  CONVERSION_RESULT,
} from '../actions/currencies';

const getLatestRate = currency => fetch(`https://frankfurter.app/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
  let currency = action.currency;

  if (currency === undefined) {
    currency = yield select(state => state.currencies.baseCurrency);
  }

  try {
    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

// getLatestRate('USD')
//   .then(res => res.json())
//   .then(response => console.log(response))
//   .catch(err => console.log(err, 'err here'));
// }
export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
}
