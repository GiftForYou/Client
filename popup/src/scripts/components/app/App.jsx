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

import CircularProgress from 'material-ui/CircularProgress';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      recomend : true
    };
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
        let temp={};
        temp.recomendation = this.props.doc_detail;
        console.log(JSON.stringify(temp));
        // axios.post('http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation', JSON.stringify(temp))
        axios({
          method: 'post',
          url: 'http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation',
          data: { data: JSON.stringify(temp) },
        }).then(function (response) {
          chrome.tabs.getSelected(null,function (tab) {
            chrome.tabs.sendMessage(tab.id, {text: 'show',value:response});
          });
        })
  }

  handleNewTab(parse) {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendMessage(tab.id, {text: 'newtab',value:parse});
    });
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({recomend: false})
      this.setState({completed});
      const diff = Math.floor(Math.random() * (35 - 20) + 20);
      this.timer = setTimeout(() => this.progress(completed + diff), 900);
    }
  }

  render() {
    let recomendation = this.props.doc_recomendation
    console.log(recomendation)
    return (
      <div style={forApp}>
        <AppBar
          title="HADIAH KU"
          style={appbar}
          showMenuIconButton={false}
        />
        <div style={selfInline}>
          <div style={paper}>
            <Paper >
              <Menu >
                <MenuItem style={{width: 205}} primaryText="Analisa" onClick={()=>this.handleClickAnalize()}/>
                <Divider style={{width: 205}}/>
                <MenuItem style={{width: 205}} primaryText="Rekomendasi" onClick={()=> {this.handleClickRecomend(); this.progress(5)}}/>
              </Menu>
            </Paper>
          </div>
          <div style={{width: '100%'}}>
            <div style={{marginBottom: 17, marginTop: 5}}>
              <Table>
                <TableHeader style={{backgroundColor: '#008b8b'}} adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false} >
                  <TableRow>
                    <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Kategori</TableHeaderColumn>
                    <TableHeaderColumn style={{textAlign:'left', color: 'white'}}>Persentase</TableHeaderColumn>
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
            {this.state.completed > 0 ? <Divider style={{marginBottom: 17}}/> : <span></span>}
            { this.state.recomend === true ?
              <span></span>
              :
              this.state.completed < 100 ?
              <div style={styles.sample}>
                <img style={{width:'10rem', height: '10rem'}} src="https://media.giphy.com/media/Q5oetB8Q0xoM8/giphy.gif"></img>
              </div>
                    :
              recomendation.hasil.length === 0 ? <div style={styles.sample}>
                <img style={{width:'25rem', height: '17rem'}} src="https://cdn.dribbble.com/users/463734/screenshots/2016807/404_error_shot.png"></img>
              </div>:
                    <div style={styles.root}>
                      <GridList
                        cellHeight={180}
                        style={styles.gridList}
                      >
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
                      </GridList>
                    </div>
            }
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
