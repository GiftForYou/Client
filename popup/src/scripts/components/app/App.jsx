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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import axios from 'axios';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        messageErr:''
      };
    this.handleClickAnalize=this.handleClickAnalize.bind(this);
    this.handleClickRecomend=this.handleClickRecomend.bind(this);
    this.handleOk=this.handleOk.bind(this);
  }
  handleClickAnalize(){
    let self=this;
    chrome.tabs.getSelected(null,function (tab) {
      var value='https://www.facebook.com/';
      if (tab.url.includes(value)) {
        console.log('masuk');
        var ind=tab.url.indexOf('?');
        var myNewUrl= tab.url;
        if (ind>=0) {
          myNewUrl=myNewUrl.slice(0,ind);
        }
        myNewUrl = myNewUrl+"/likes_all";
        chrome.tabs.update(tab.id, {url: myNewUrl});
        chrome.tabs.onUpdated.addListener(function(tabId , info) {
          if (info.status == "complete") {
            chrome.tabs.sendMessage(tab.id, {text: 'start'});
          }
        })
      }else {
        self.setState({open: true,messageErr:'Visit facebook.'});
      }
    });
  }
  handleClickRecomend (){
    if (this.props.doc_status) {
      let temp={};
      temp.recomendation = this.props.doc_detail;
      axios({
        method: 'post',
        url: 'http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation',
        data: { data: JSON.stringify(temp) },
      }).then(function (response) {
        chrome.tabs.getSelected(null,function (tab) {
          chrome.tabs.sendMessage(tab.id, {text: 'show',value:response});
        });
      })
    }else {
      this.setState({open: true,messageErr:'Analize First.'});
    }
  }

  handleNewTab(parse) {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendMessage(tab.id, {text: 'newtab',value:parse});
    });
  }

  handleOk(){
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleOk}
      />,
    ];
    return (
      <div style={{height: 600,width: 800}}>
        <AppBar
          title="GIFT FOR YOU"
          style={appbar}
          showMenuIconButton={false}
        />
        <div style={selfInline}>
          <div style={paper}>
            <Paper >
              <Menu >
                <MenuItem style={{width: 205}} primaryText="Analize" onClick={()=> {this.handleClickAnalize();}}/>
                <Divider style={{width: 205}}/>
                <MenuItem style={{width: 205}} primaryText="Recommendation" onClick={()=> {this.handleClickRecomend();}}/>
              </Menu>
            </Paper>
          </div>
          <div style={{width: '100%'}}>
            <div style={{marginBottom: 17, marginTop: 5}}>
                  <Table>
                    <TableHeader style={{backgroundColor: '#008b8b'}} adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false} >
                      <TableRow>
                        <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Category</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Percentage</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:'left', color: 'white'}} colSpan="3">Detail</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false} displayRowCheckbox={false} stripedRows={true}>
                      {this.props.doc_detail.map((category, index)=>{
                        return(
                          <TableRow key={index}>
                            <TableRowColumn>{category.name}</TableRowColumn>
                            <TableRowColumn>{category.count} %</TableRowColumn>
                            <TableRowColumn colSpan="3" style={{whiteSpace: 'normal',wordWrap: 'break-word'}}>{category.data.toString()}</TableRowColumn>
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
            {
              this.props.doc_recomendation.map((data, index) => (
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
          <Dialog
            title="ERR"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          {this.state.messageErr}
        </Dialog>
        </div>

      </div>
    );
  }
}

export const mapStateToProps = (state)=>{
  return{
    doc_user : state.doc.doc_user,
    doc_detail: state.doc.doc_detail,
    doc_status: state.doc.status,
    doc_recomendation : state.doc.doc_recomendation.data.hasil
  };
}

export default connect(mapStateToProps)(App);
