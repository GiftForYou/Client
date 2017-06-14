import React, {Component} from 'react';
import {connect} from 'react-redux';
import {appbar, forApp, selfInline, paper, styles} from '../../css/App.style'

import {Paper, Menu, MenuItem, Divider, Avatar, AppBar} from '../../material-ui'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
    const tilesData = [
      {
        img: 'https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg',
        title: 'Breakfast',
        author: 'jill111',
      },
      {
        img: 'https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
      },
      {
        img: 'https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg',
        title: 'Camera',
        author: 'Danson67',
      },
      {
        img: 'https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg',
        title: 'Morning',
        author: 'fancycrave1',
      },
      {
        img: 'https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg',
        title: 'Hats',
        author: 'Hans',
      },
    ];
    console.log('apa', tilesData.length);
    return (
      <div style={forApp}>
        <AppBar
          title="HADIAH KU"
          style={appbar}
        />
        <div style={selfInline}>
          <div style={paper}>
            <Paper >
              <Menu >
                <MenuItem style={{width: 205}} primaryText="Analize" />
                <Divider style={{width: 205}}/>
                <MenuItem style={{width: 205}} primaryText="Show Recomendation"/>
              </Menu>
            </Paper>
          </div>
          <div style={{width: '100%'}}>
            <div style={{marginBottom: 17}}>
              <Table style={{width: '37em'}}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} >
                  <TableRow>
                    <TableHeaderColumn>Category</TableHeaderColumn>
                    <TableHeaderColumn>Count</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false} displayRowCheckbox={false} stripedRows={true}>
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
            <div style={styles.root}>
              <GridList
                cellHeight={180}
                style={styles.gridList}
              >
                {tilesData.map((tile, index) => (
                  <GridTile
                    key={index}
                    title={tile.title}
                    subtitle={<span>by <b>{tile.author}</b></span>}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                  >
                    <img src={tile.img} />
                  </GridTile>
                ))}
              </GridList>
            </div>
          </div>

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
