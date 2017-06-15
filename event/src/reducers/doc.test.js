import React from 'react';
import doc,{initialState} from './doc'

test('[Event Test] overAll initialState', () => {
  expect(initialState).toMatchSnapshot();
});

test('[Event Test] initialState have doc_user', () => {
  expect(initialState.doc_user).toMatchSnapshot();
});

test('[Event Test] initialState have doc_detail', () => {
  expect(initialState.doc_detail).toMatchSnapshot();
});

test('[Event Test] initialState have doc_recomendation', () => {
  expect(initialState.doc_recomendation).toMatchSnapshot();
});

test('[Event Test] doc empty', () => {
  expect(doc(initialState,{"action":{"type":''}})).toMatchSnapshot();
});

test('[Event Test] SET_DOC_USER', () => {
  expect(doc(initialState,{"action":{"type":'SET_DOC_USER',"value":'TEST'}})).toMatchSnapshot();
});

test('[Event Test] SET_DOC_DETAIL', () => {
  expect(doc(initialState,{"action":{"type":'SET_DOC_DETAIL',"value":'TEST'}})).toMatchSnapshot();
});
test('[Event Test] SET_RECOMEND', () => {
  expect(doc(initialState,{"action":{"type":'SET_RECOMEND',"value":'TEST'}})).toMatchSnapshot();
});
