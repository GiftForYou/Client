import React from 'react';
import {combineReducers} from 'redux';
import doc from './doc';

test('[Event Test] overAll index', () => {
  expect(combineReducers({doc})).toMatchSnapshot();
});
