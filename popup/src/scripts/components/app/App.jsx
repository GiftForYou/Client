import React, {Component} from 'react';
import {connect} from 'react-redux';
import {style} from './App.style'
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
    // axios.post('http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation', JSON.stringify(temp))
    axios({
      method: 'post',
      url: 'http://servergift-dev.ap-southeast-1.elasticbeanstalk.com/recomendation',
      data: { data: JSON.stringify(temp) },
    }).then(function (response) {
      console.log('yeah333');
      console.log(response);
      chrome.tabs.getSelected(null,function (tab) {
        chrome.tabs.sendMessage(tab.id, {text: 'show',value:response});
      });
    })
  }
  render() {
    return (
      <div style={style}>
        <p>
          {JSON.stringify(this.props.doc_user)}
          <button onClick={this.handleClickAnalize}>Analize</button>
          {JSON.stringify(this.props.doc_detail)}
          <button onClick={this.handleClickRecomend}>Show Recomendation</button>
        </p>
        <p>
        {JSON.stringify(this.props.doc_recomendation)}
        </p>
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
