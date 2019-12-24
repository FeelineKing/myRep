import React, {Component} from 'react';
import Fullscreen from "react-full-screen";
import '../../data/data';
import './Welcoming.css';

import introSound from './resourses/sounds/introAudio.mp3';

import Music from './Music/Music';

import NewGame from './00.NewGame/NewGame';
import Story from './01.Story/Story';
import RegistrationForm from './02.RegistrationForm/RegistrationForm';
import ClassChoose from './03.ClassChoose/ClassChoose';
import ClassStory from './04.ClassStory/ClassStory';


class Welcoming extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      sound: true,
      fullScreen: false,
      blackout: true,
    }

    this.mainStage = React.createRef();
  }

/*   componentDidMount() {
    this.setState(prev => {
      return {
        stage: JSON.parse(localStorage.getItem('stage')) || 0
      }
    })
  } */

  componentDidUpdate() {
    if (this.state.stage === 5) {
      //changeComponent
    }
  }
  
  componentsSwitcher = () => {
    switch(this.state.stage) {
      case 0: return (
        <NewGame startGame={this.startGame}/>
      );
      case 1: return (
        <>
        <Music music={introSound} loop={false}/>
        <Story submit={this.nextStage}/>
        </>
      );
      case 2: return (
        <>
        <RegistrationForm mainStage={this.mainStage} submit={this.nextStage}/>
        </>
      ); 
      case 3: 
      return (
        <>
        <ClassChoose submit={this.nextStage}/>
        </>
      );
      case 4:
      return (
        <>
        <ClassStory bg={this.mainStage} submit={this.nextStage}/>
        </>
      )
      default: return ;
    }
  }

  startGame = () => {
    /* localStorage.setItem('stage', JSON.stringify(1)) */
    this.setState({
      stage: 1,
    },  () => this.toFullScreen(),
        () => this.turnSound())
  }

  nextStage = () => {
    this.setState(prev => {
      return {
        stage: prev.stage += 1,
      }
    });
  }

  toFullScreen = () => {
    this.setState(prev => {
      return {
        fullScreen: !prev.fullScreen
      }
    })
  }

  turnSound = () => {
    this.setState({
      sound: true,
    })
  }

  fullScreenCreator = () => {
    if (this.state.fullScreen) {
      return (
        <div className="stage__arrows" onMouseEnter={() => {this.setState({arrowsFullAnim: true})}} onMouseLeave={() => {this.setState({arrowsFullAnim: false})}}>
          <span className={this.state.arrowsFullAnim
            ? "stage__arrow stage__arrow_full1 stage__arrow_full1_anim"
            : "stage__arrow stage__arrow_full1"}>
          </span>
          <span className={this.state.arrowsFullAnim
            ? "stage__arrow stage__arrow_full2 stage__arrow_full2_anim"
            : "stage__arrow stage__arrow_full2"}>
          </span>
          <span className={this.state.arrowsFullAnim
            ? "stage__arrow stage__arrow_full3 stage__arrow_full3_anim"
            : "stage__arrow stage__arrow_full3"}>
          </span>
          <span className={this.state.arrowsFullAnim
            ? "stage__arrow stage__arrow_full4 stage__arrow_full4_anim"
            : "stage__arrow stage__arrow_full4"}>
          </span>
        </div>
      )
    } else {
      return (
        <div className="stage__arrows" onMouseEnter={() => {this.setState({arrowsWindowAnim: true})}} onMouseLeave={() => {this.setState({arrowsWindowAnim: false})}}>
          <span className={this.state.arrowsWindowAnim
            ? "stage__arrow stage__arrow_window1 stage__arrow_window1_anim"
            : "stage__arrow stage__arrow_window1"}>
          </span>
          <span className={this.state.arrowsWindowAnim
            ? "stage__arrow stage__arrow_window2 stage__arrow_window2_anim"
            : "stage__arrow stage__arrow_window2"}>
          </span>
        </div>
      )
    }
  }

  render() {
    return (
      <Fullscreen 
      enabled={this.state.fullScreen}
      onChange={fullScreen => this.setState({fullScreen})}>
      <section className={this.state.blackout ? 'stage blackout' : 'stage'} ref={this.mainStage}>
      {this.componentsSwitcher()}
        <div
          onClick={this.toFullScreen} 
          className={this.state.stage ? 'stage__fullscreen' : 'fullscreen hide' }
          alt='full screen'>
          {this.fullScreenCreator()}
        </div>
      </section>
      </Fullscreen>
    )
  }
}

export default Welcoming;