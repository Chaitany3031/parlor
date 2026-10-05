import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './auth/reducer';
import salonReducer from './salon/reducer';
import bookingReducer from './booking/reducer';
import categoryReducer from './category/reducer';
import serviceOfferingReducer from './serviceOffering/reducer';
import notificationReducer from './notification/reducer';
import reviewReducer from './review/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  salon: salonReducer,
  booking: bookingReducer,
  category: categoryReducer,
  serviceOffering: serviceOfferingReducer,
  notification: notificationReducer,
  review: reviewReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
