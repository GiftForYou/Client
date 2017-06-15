import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self=this;
    chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
      if (response.text==="user") {
        let temp=[],obj={};
        obj.name=document.getElementById('fb-timeline-cover-name').innerText;
        for (var i = 0; i < document.getElementById('intro_container_id').getElementsByClassName('_50f3').length; i++) {
          temp.push(document.getElementById('intro_container_id').getElementsByClassName('_50f3')[i].innerText);
        }
        obj.intro=temp;
        obj.url = document.getElementsByClassName('_6_7 clearfix lfloat _ohe').innerText;

        self.props.dispatch({
          type :'SET_DOC_USER',
          value : obj
        });
      }else if(response.text==="start"){
        let temp=[];
        for (var i = 1; i < document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3sz').length; i++) {
          var obj={};
          obj.name=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3sz')[i].innerText;
          obj.url=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3c_')[i].getAttribute("href");
          obj.count=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3d0')[i].innerText;
          obj.data=[];
          temp.push(obj);
        }
        self.props.dispatch({
          type :'SET_DOC_DETAIL',
          value : temp
        });
        self.props.dispatch({
          type :'SET_STATUS',
          value : true
        });
        for (var i = 0; i < temp.length; i++) {
          let currI=i;
          fetch(temp[i].url,{ credentials: "include" }).then(function(response){
            return response.text();
          }).then(function (body) {
            body=body.split('data-hovercard-prefer-more-content-show="1">');
            var arr=[];
            body.forEach(function(data,index){
              if (data[0]!=='<') {
                var ind=data.indexOf("<");
                data=data.slice(0,ind);
                arr.push(data.replace(/[^a-zA-Z ]/g, ''));
              }
            })
            console.log(arr);
            temp[currI].data=arr;
            self.props.dispatch({
              type :'SET_DOC_DETAIL',
              value : temp
            });
          })
        }
      }else if (response.text==="show") {
        self.props.dispatch({
          type :'SET_RECOMEND',
          value : response.value
        });
      }else if (response.text==="newtab") {
        window.open(response.value,'_blank');
      }
    })
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}



export default connect()(App);
