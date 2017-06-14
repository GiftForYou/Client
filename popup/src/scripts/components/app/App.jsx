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
    console.log('click')
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
        // axios.post('http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation', JSON.stringify(temp))
        axios({
          method: 'post',
          url: 'http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation',
          data: { data: JSON.stringify(temp) },
        }).then(function (response) {
          console.log(response);
          chrome.tabs.getSelected(null,function (tab) {
            chrome.tabs.sendMessage(tab.id, {text: 'show',value:response});
          });
        })
  }

  handleNewTab(parse) {
    console.log('jalan', parse);
    chrome.tabs.getSelected(null,function (tab) {
      chrome.tabs.sendMessage(tab.id, {text: 'newtab',value:parse});
    });
  }

  render() {
    console.log('reco ',this.props.doc_recomendation);
    let recomendation = this.props.doc_recomendation
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
                <MenuItem style={{width: 205}} primaryText="Analize" onClick={()=>this.handleClickAnalize()}/>
                <Divider style={{width: 205}}/>
                <MenuItem style={{width: 205}} primaryText="Show Recomendation" onClick={()=>this.handleClickRecomend()}/>
              </Menu>
            </Paper>
          </div>
          <div style={{width: '100%'}}>
            <div style={{marginBottom: 17}}>
              <Table>
                <TableHeader style={{backgroundColor: '#008b8b'}} adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false} >
                  <TableRow>
                    <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Category</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Count</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:'left', color: 'white'}} colSpan="3">Detail</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody deselectOnClickaway={false} displayRowCheckbox={false} stripedRows={true}>
                  {this.props.doc_detail.map((category, index)=>{
                    return(
                      <TableRow key={index}>
                        <TableRowColumn>{category.name}</TableRowColumn>
                        <TableRowColumn>{category.count}</TableRowColumn>
                        <TableRowColumn colSpan="3" style={{whiteSpace: 'normal',wordWrap: 'break-word'}}>{category.data}</TableRowColumn>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            <div style={styles.root}>
              <GridList
                cellHeight={180}
                style={styles.gridList}
              >
                { recomendation === undefined ? <span></span> :
                  recomendation.hasil.map((data, index) => (
                  <GridTile
                    onClick={()=> this.handleNewTab(data.Url_lapak)}
                    key={index}
                    title={data.name}
                    subtitle={<span>by <b>{data.seller_username}</b></span>}
                  >
                    <img src={data.Images[0]} />
                  </GridTile>
                ))
              }
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
    doc_recomendation : state.doc.doc_recomendation.data
  };
}

export default connect(mapStateToProps)(App);
