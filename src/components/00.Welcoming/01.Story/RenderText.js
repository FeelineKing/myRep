import React, {Component} from 'react';

class RenderText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      typingIsFinished: false,
    };

  };

  componentDidMount() {
    this.renderText();
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.renderText();
    }
  }

  renderText = () => {
    if (!this.props.text) {
      return ;
    }
    let iix = 0;
    this.props.fromShadow();
    this.setState({
      text: '',
      typingIsFinished: false,
    }, () => {
      const textAnim = setInterval(() => {
        if (iix === this.props.text.length) {
          clearInterval(textAnim);
          iix = 0;
          this.setState({
            typingIsFinished: true,
          }, () => {
            setTimeout(() => {
              this.props.stageChanger();
            }, 5000)
          })
          return ;
        } else {
          let stop = this.props.skip;
          if (stop) {
            clearInterval(textAnim);
            iix = 0;
            this.setState({
              typingIsFinished: true,
              text: '',
            }, () => {
              setTimeout(() => {
                this.props.stageChanger();
              }, 1000)
            })
            return ;
          }
          this.setState((prev) => {
            return {
              text: prev.text + this.props.text[iix]
            }
          })
          iix += 1;
        }
        
      }, 45);
    })
  }

  render() {
    return(
      <p className={this.props.class}>
        {this.state.text}
      </p>
    ) 
  }
}

export default RenderText;