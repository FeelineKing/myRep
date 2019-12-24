import React, {Component} from 'react';
import './Chats.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typingIsFinished: false,
      text: '',
    }

    this.intervalWasStarted = false;
  };

  componentDidMount() {
    this.typeText();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.typeText();
    }
  }

  callbackFirst = () => {
    if (this.props.firstCallback) {
      this.props.firstCallback(this.state.typingIsFinished);
    }
  }
  
  typeText = () => {
    let iix = 0;
    if (this.intervalWasStarted) {
      return ;
    }
    this.setState({
      text: '',
      typingIsFinished: false,
    },() => {
      const textAnim = setInterval(() => {
        if (iix === this.props.text.length) {
          clearInterval(textAnim);
          iix = 0;
          this.setState({
            typingIsFinished: true,
          }, () => {
            this.callbackFirst();
          })
          return ;
        }
        this.setState((prev) => {
          return {
            text: prev.text + this.props.text[iix]
          }
        })
        iix += 1;
      }, 35);
    })
  }

  render() {
    return (
      <div className={`chat blocker ` + this.props.class}>
          {
            this.props.img 
            ? <div className="chat__imgContainer">
                <img src={this.props.img} alt="person" className="chat__person"></img>
              </div>
            : null
          }
        <div className="chat__container">
          {
            this.props.personName
              ? <h2 className="chat__personName">{this.props.personName}</h2>
              : null
          }
          {
            this.props.text
              ? <p className="chat__text">
                {this.state.text}
              </p>
              : null
          }
          {
            this.props.variants && this.state.typingIsFinished
              ? <div className="chat__variants">
                  {this.props.variants.map(item => (
                    <p className="chat__variant">{item}</p>
                  ))}
                </div>
              : null
          }
          {
            this.props.help && this.state.typingIsFinished
              ? <p className="chat__help">{this.props.help}</p>
              : null
          }
        </div>
        <button className="chat__nextButton"></button>
      </div>
    )
  }
}

export default Chat;