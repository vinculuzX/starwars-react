import React, { Component } from 'react';
import './App.css'
const API = 'https://swapi.co/api/planets/'
class App extends Component {
  
  constructor(){
    super();
    this.state = {
      planets:[],
      films:[],
      isLoading: false,
      param:1
    }
  }
  addStars = () =>{
    const numberStars = 1000;
    let i = 0;
    for ( i ; i < numberStars ; i++){
      let star = document.createElement("div");  
      star.className = "star";
      var xy = this.getRandomPosition();
      star.style.top = xy[0] + 'px';
      star.style.left = xy[1] + 'px';
      document.body.append(star);
    }
  }
  getRandomPosition = () => {  
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
  }
  
  
  componentDidMount(){

    this.setState({ isLoading: true });
    setTimeout(()=>{
      fetch(API + this.state.param).then(res => res.json())
      .then(res => this.setState({planets:res,films:res.films,isLoading: false}))
      .catch(error => console.log(error))
    },6000)
    // fetch(API + this.state.param).then(res => res.json())
    // .then(res => this.setState({planets:res,films:res.films,isLoading: false}))
    // .catch(error => console.log(error))
    // add stars on background
    this.addStars();
  }
  
  changePlanet = (e) => {
    this.setState({param:this.state.param + 1});
    fetch(API + this.state.param).then(res => res.json())
    .then(res => this.setState({planets:res,films:res.films,isLoading: false}))
    .catch(error => console.log(error))
  }
  
  
  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading"> A long time ago, in a galaxy far,<br></br> far away....</div>
        );
      }
      return (
        <div className="starb2wars">
        <div className="board">
        <div className="header">
        {this.state.planets.name}
        </div>
        <div className="content">
        <p><b>Population :</b>  {this.state.planets.population} </p>
        <p><b>Climate :</b>  {this.state.planets.climate}</p>
        <p><b>Terrain : </b>  {this.state.planets.terrain}</p>
        <p className="films"><b>feature in  </b>{this.state.films.length} films</p>
        </div>
        </div>
        <br/><br/>
        <div className="myButton">
        <button  onClick={this.changePlanet.bind(this)} className="button button__success">next</button>  
        </div>
        </div>
        )
      }
    }
    
    export default App