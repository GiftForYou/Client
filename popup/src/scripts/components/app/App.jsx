import React, {Component} from 'react';
import {connect} from 'react-redux';
import {appbar, forApp, selfInline, paper} from '../../css/App.style'

import {Paper, Menu, MenuItem, Divider, Avatar, AppBar} from '../../material-ui'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClickRecomend=this.handleClickRecomend.bind(this);
  }
  handleClickAnalize(){
    chrome.tabs.getSelected(null,function (tab) {
      chrome.tabs.sendMessage(tab.id, {text: 'user'});
      setTimeout(function(){
        var ind=tab.url.indexOf('?');
        var myNewUrl= tab.url.slice(0,ind);
        myNewUrl = myNewUrl+"/likes_all";
        chrome.tabs.update(tab.id, {url: myNewUrl});
        chrome.tabs.onUpdated.addListener(function(tabId , info) {
          if (info.status == "complete") {
            chrome.tabs.sendMessage(tab.id, {text: 'start'});
          }
        })
      }, 1000);
    });
  }
  handleClickRecomend (){
    console.log('ag');
    let temp={};
    temp.recomendation=this.props.doc_detail;
    console.log(temp);
    axios.post('http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation', {
      data: temp
    })
    .then(function (data) {
      console.log(data);
      chrome.tabs.getSelected(null,function (tab) {
        chrome.tabs.sendMessage(tab.id, {text: 'show',value:data});
      });
    })
  }

  render() {
    return (
      <div style={forApp}>
        <AppBar
          title="HADIAH KU"
          style={appbar}
        />
        <div style={selfInline}>
          <Paper style={paper}>
            <Menu>
              <MenuItem primaryText="Analize" />
              <Divider style={{width: 205}}/>
              <MenuItem primaryText="Show Recomendation"/>
            </Menu>
          </Paper>
          <Table>
            <TableHeader displaySelectAll={false} enableSelectAll={false} >
              <TableRow>
                <TableHeaderColumn>Category</TableHeaderColumn>
                <TableHeaderColumn>Count</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Christopher Nolan</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    doc_user : state.doc.doc_user,
    doc_detail: state.doc.doc_detail,
    doc_recomendation : state.doc.doc_recomendation
  };
}

export default connect(mapStateToProps)(App);
