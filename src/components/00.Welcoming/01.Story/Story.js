import React, {Component} from 'react';
import apocalypse01 from '../resourses/img/apocalypse01.jpg';
import apocalypse02 from '../resourses/img/apocalypse02.jpg';
import apocalypse03 from '../resourses/img/apocalypse03.jpg';
import apocalypse04 from '../resourses/img/apocalypse04.jpg';
import { welcomingStory } from '../../../data/welcomingStory';
import RenderText from './RenderText';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localStage: 0,
      skip: false,
      next: false,
    }

    this.bg = React.createRef();
  }

  stageChanger = () => {
    if (this.state.localStage !== 3) {
      this.bg.current.className = 'storySection__background toShadow';
    }
    setTimeout(() => {
      this.setState(prev => {
        return {
          localStage: prev.localStage + 1,
          skip: false,
        }
      });
    }, 2000)
  }

  bgChanger = () => {
    switch(this.state.localStage) {
      case 0: return apocalypse01;
      case 1: return apocalypse02;
      case 2: return apocalypse03;
      case 3: return apocalypse04;
      case 4: return apocalypse04;
      default: return apocalypse01;
    }
  }

  fromShadow = () => {
    this.bg.current.className = 'storySection__background fromShadow';
  }

  comeback = () => {
    this.setState({
      skip: false,
    })
  }

  handleEvent = () => {
    if (this.state.skip === true) {
      return ;
    } 
    if (this.state.localStage < 3) {
      this.setState({
        skip: true,
      })
    } else {
      this.setState({
        skip: true,
      }, () => {
        this.bg.current.className = 'storySection__background toShadow';
        setTimeout(() => {
          this.props.submit()
        }, 2000)
      })
    }
  }

  render() {
    return (
      <>
        <section className='storySection'>
          <img src={this.bgChanger()} alt='bg_01' className={'storySection__background'} ref={this.bg}></img>
          <RenderText 
            text={welcomingStory[this.state.localStage] ? welcomingStory[this.state.localStage] : null} 
            class={'storySection__text'} 
            stageChanger={this.stageChanger} 
            fromShadow={this.fromShadow}
            case={this.state.localStage}
            skip={this.state.skip}
            comeback={this.comeback}>
          </RenderText>
          <button className='storySection__button' onClick={this.handleEvent}>{this.state.localStage === 4 ? 'Continue' : 'Skip'}</button>
        </section>
      </>
    )
  }
}

export default Story;