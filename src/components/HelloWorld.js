import React, { Component } from 'react';
import './HelloWorld.css';
var fp = require('request-promise');
var url = 'https://hackthenorth.com/fe-users.json';
var Griddle = require('griddle-react');

class HelloWorld extends Component {

  getInitialState() {
    return {
        data: {}
    }
  }
  getData() {
    fp(url)
      .then((json) => {
        var newData = [];
        var json2 = JSON.parse(json);
        for (var i = 0; i < json2.length; i++) {
          var obj ={};
          obj.name = json2[i].name;
          var str = '';
          for (var j = 0; j < json2[i].skills.length; j++) {
            if(j)
              str = str + ", " + json2[i].skills[j].skill;
            else
              str = str + json2[i].skills[j].skill;
          }
          obj.skills = str;
          obj.link = json2[i].picture;
          obj.status = json2[i].status;
          newData.push(obj);
        }
        this.setState({data: newData});
      });
  }
  componentDidMount() {
    this.setState({
      data: {}
    });
    this.getData();
  }

  render() {
    const data = this.state && this.state.data ? this.state.data : null;

    return (
      <div className='HelloWorld'>
        <link href="css/griddle.css" rel="stylesheet" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script>
        <script src="//fb.me/react-0.12.0.js"></script>
        <script src="//fb.me/JSXTransformer-0.12.0.js"></script>
        <script type="text/javascript" src="scripts/griddle.js"></script>

        <div> {data ? <Griddle results={data}
                       showFilter={true}
                       resultsPerPage={50}
                       initialSortAscending={true}/>
                    : '' } </div>
      </div>

    )
  }
}

export default HelloWorld;
