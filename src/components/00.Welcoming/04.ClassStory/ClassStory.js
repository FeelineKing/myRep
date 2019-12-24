import React, {Component} from 'react';
import data from '../../../data/data';
import {greetingMale, greetingFeemale} from '../../../data/welcomingStory';

class ClassStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [],
      eventIsEnd: false,
    }
  }

  componentDidMount() {
    this.renderText();
  }

  bgChanger = (count) => {
    switch(count) {
      case 2: this.props.bg.current.classList.add('blackout__largeToMiddle');
      break;
      case 4: this.props.bg.current.classList.replace('blackout__largeToMiddle', 'blackout__middleToLittle');
      break;
      case 6: this.props.bg.current.classList.replace('blackout__middleToLittle', 'blackout__littleToNone');
      setTimeout(() => {
        this.props.bg.current.classList.remove('blackout__littleToNone', 'blackout')
      }, 3000)
      break;
      default: 
      return ;
    }
  }

  renderText = () => {
    const textArr = data.actor.sex === 'male' ? [...greetingMale] : [...greetingFeemale];
    let counter = 0;

    const makeText = setInterval(() => {
      if (counter > textArr.length) {
        clearInterval(makeText);
        setTimeout(() => {
          this.setState({
            eventIsEnd: true,
          })
        }, 1000)
      } else {
        this.setState(prev => {
          return {
            text: [...prev.text, <p className='classStory__text'>{textArr[counter]}</p>]
          }
        }, () => {
          counter++;
          this.bgChanger(counter);
        })
      }
    }, 3000)
  };

  render() {
    return (
      <>
        {this.state.text}
        {this.state.eventIsEnd ? <button className='classStory__button' onClick={this.props.submit}>continue</button> : null}
      </>
    )
  }
}

export default ClassStory;