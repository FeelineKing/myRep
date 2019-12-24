import React, {Component} from 'react';
import data from '../../../data/data';
import {welcomingChatFirst} from '../../../data/ChatsData/00.welcoming';
import male from '../resourses/img/male.png';
import feemale from '../resourses/img/feemale.png';
import Chat from '../../chat/Chat/Chat';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sex: null,
      valid: false,
      stage: 0,
      chatEnd: false,
    }

    this.demoArrow = React.createRef();
    this.timer = null;
    this.debounced = false;
  };

  chatChoise = () => {
    switch(this.state.stage) {
      case 0: return (
        <Chat 
          img={data.personImages.KotomineKirei} 
          personName={'Kotomine'} 
          text={welcomingChatFirst.kotomine.text1()} 
          help={welcomingChatFirst.helps.helpName()} 
          firstCallback={this.uiUnblock}>
        </Chat>
      );
      case 1:
        return (
        <Chat 
          img={data.personImages.KotomineKirei} 
          personName={'Kotomine'} 
          text={welcomingChatFirst.kotomine.text2()} 
          help={welcomingChatFirst.helps.helpSex()} 
          firstCallback={this.uiUnblock}>
        </Chat>
      );
      case 2: return (
        <Chat 
          img={data.personImages.KotomineKirei} 
          personName={'Kotomine'} 
          text={welcomingChatFirst.kotomine.text3()}
          firstCallback={this.uiUnblock}
          help={this.state.valid ? null : welcomingChatFirst.helps.nameNotValid()}>
        </Chat>
      );
      case 3: return (
        <Chat 
          img={data.personImages.KotomineKirei} 
          personName={'Kotomine'} 
          text={welcomingChatFirst.kotomine.text3()} 
          firstCallback={this.uiUnblock}
          class={'inShadow'}
        >
        </Chat>
      )
      default: return null;
    }
  }

  uiUnblock = (chatEnd) => {
    this.setState({
      chatEnd
    }, () => {
      this.arrowAnimationStart()
    })
  }

  nameEntering = (event) => {
    let name = event.target.value;
    data.actor.setActorName(name);
    let requiredSymbol = name.toLowerCase().charCodeAt(name.length - 1);
    if (name.length > 15 || 97 > requiredSymbol || 122 < requiredSymbol) {
      return ;
    }
    this.setState({
      name,
      valid: name.length >= 3 ? true : false,
    }, () => {
      if (this.state.name.length >= 3) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (!this.debounced) {
            this.stageSwitcher();
          }
          this.debounced = true;
        }, 2000);
      }
    });
  };

  arrowAnimationStart = () => {
    switch(this.state.stage) {
      case 0:
        this.demoArrow.current.className = 'formD__demoArrow showNonShadowwedEl';
        setTimeout(() => {
          this.demoArrow.current.className = 'formD__demoArrow';
        }, 1000);
      break;
      case 1:
        this.demoArrow.current.className = 'formD__demoArrow showNonShadowwedEl';
        this.demoArrow.current.style.left = '455px';
        setTimeout(() => {
          this.demoArrow.current.className = 'formD__demoArrow';
        }, 1000);
      break;
      case 2:
        this.demoArrow.current.className = 'formD__demoArrow showNonShadowwedEl';
        this.demoArrow.current.style.left = '655px';
        setTimeout(() => {
          this.demoArrow.current.className = 'formD__demoArrow';
        }, 1000);
      default: return null;
    }
  }

  stageSwitcher = () => {
    this.setState(prev => {
      return {
        stage: prev.stage + 1,
        chatEnd: false,
      }
    });
  };

  sexChange = (event) => {
    data.actor.sex = event.target.id;
    if (this.state.stage !== 2 || !this.eventIsRunning) {
      this.stageSwitcher();
    }
    this.setState({
      sex: event.target.id
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.stage !== 2 || !this.state.valid) {
      return ;
    }
    this.stageSwitcher();
    setTimeout(() => {
      this.props.submit()
    }, 1000)
  };

  render() {
    return (
      <>
      {this.chatChoise()}
      <form method="POST" action="#" className={this.state.stage === 3 
        ? 'formD inShadow'
        : 'formD' } id="formD">
        <span 
          ref={this.demoArrow} 
          style={{
              'position': 'absolute'
          }}
        >
        </span>
        <div 
          className={this.state.stage > 0
            ? 'formD__nameContainer' 
              : this.state.chatEnd 
                ? 'formD__nameContainer showShadowwedEl' 
                : 'formD__nameContainer'}
          style={{
            'zIndex': `${this.state.stage > 0
              ? 5
              : this.state.chatEnd 
                ? 5
                : 0}`}
        }>
          <div className="formD__nameLabel">
            <input 
              type="text" 
              className="formD__nameInput"
              onChange={this.nameEntering} 
              value={this.state.name}
            />
          </div>
          <div className="formD__sexActive" style={{
            'background': `url(${!this.state.sex ? null : this.state.sex === 'male' ? male : feemale})`,
          }}></div>
        </div>
        <div className={this.state.stage > 1
          ? 'formD__sexContainer' 
          : this.state.chatEnd && this.state.stage === 1
            ? 'formD__sexContainer showShadowwedEl' 
            : 'formD__sexContainer'}
            style={{
          'zIndex': `${this.state.stage > 1
            ? 5
            : this.state.chatEnd && this.state.stage === 1
              ? 5
              : 0}`}
        }>
          <input type="radio" className="formD__sexInput" id="male" name="sexChoise" onClick={this.sexChange}/>
          <label htmlFor="male" className="formD__male" ></label>
          <input type="radio" className="formD__sexInput" id="feemale" name="sexChoise" onClick={this.sexChange}/>
          <label htmlFor="feemale" className="formD__feemale"></label>
        </div>
        <button className={this.state.stage > 2
            ? 'formD__submit' 
              : this.state.chatEnd && this.state.stage === 2
                ? 'formD__submit showShadowwedEl' 
                : 'formD__submit'}
          style={{
            'zIndex': `${this.state.stage > 2
              ? 5
              : this.state.chatEnd && this.state.stage === 2
                ? 5
                : 0}`}}
          onClick={this.handleSubmit}>I'm ready</button>
      </form>
      </>
    )
  }
}

export default RegistrationForm;