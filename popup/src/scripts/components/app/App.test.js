import React from 'react';
import {App,mapStateToProps} from './App';
import renderer from 'react-test-renderer';

const state={doc:{
  doc_user:'',
  doc_detail:[''],
  doc_recomendation:[]
}}
// const component = renderer.create(<App ></App>);

test('[Popup Test] overAll ', () => {
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
//
// test('[Popup Test] app type', () => {
//   let tree = component.toJSON();
//   expect(tree.props).toMatchSnapshot();
// });
//
// test('[Popup Test] app have style', () => {
//   let tree = component.toJSON();
//   expect(tree.props.style).toMatchSnapshot();
// });
//
// test('[Popup Test] style have height', () => {
//   let tree = component.toJSON();
//   expect(tree.props.style.height).toMatchSnapshot();
// });
// test('[Popup Test] style have width', () => {
//   let tree = component.toJSON();
//   expect(tree.props.style.width).toMatchSnapshot();
// });
//
// test('[Popup Test] app have children', () => {
//   let tree = component.toJSON();
//   expect(tree.children).toMatchSnapshot();
// });

// test('[Popup Test] app mapStateToProps empty', () => {
//   expect(mapStateToProps(state)).toMatchSnapshot();
// });
//
// test('[Popup Test] app mapStateToProps doc_user', () => {
//   state.doc.doc_user='TEST';
//   expect(mapStateToProps(state)).toMatchSnapshot();
// });
//
// test('[Popup Test] app mapStateToProps doc_detail', () => {
//   state.doc.doc_detail='TEST';
//   expect(mapStateToProps(state)).toMatchSnapshot();
// });
//
// test('[Popup Test] app mapStateToProps doc_recomendation', () => {
//   state.doc.doc_recomendation='TEST';
//   expect(mapStateToProps(state)).toMatchSnapshot();
// });
