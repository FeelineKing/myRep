import React, {Component} from 'react';
import InputRange from 'react-input-range';

import speakerFull from '../resourses/img/speakerFull.png';
import speakerMid from '../resourses/img/speakerMid.png';
import speakerLow from '../resourses/img/speakerLow.png';
import speakerEmpty from '../resourses/img/speakerEmpty.png';

class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 5,
      showControls: false
    };

    this.volumeRef = React.createRef();
  };

  componentDidMount() {

  }

  volumeChange = () => {
    this.volumeRef.current.volume = this.state.volume / 10;
  }

  requiredVolumeIcon = () => {
    switch(true) {
      case(this.state.volume === 10): 
      return speakerFull;

      case(this.state.volume === 0):
      return speakerEmpty;

      case(this.state.volume >= 5):
      return speakerMid;

      case(this.state.volume < 5):
      return speakerLow;

      default:
      return;
    }
  }

  volumeControlsShow = () => {
    if (this.state.showControls) {
      return ;
    } else {
      this.setState({
        showControls: true
      }, () => {
        setTimeout(f => {
          this.setState({
            showControls: false
          })
        }, 20000)
      })
    }
  }

  render() {
    return (
      <>
        <audio src={this.props.music} ref={this.volumeRef} type="audio/mp3" autoPlay="autoplay" loop={this.props.loop ? 'loop' : null} volume='0.5'/>
        <div className="volumeIcon">
          <img src={this.requiredVolumeIcon()} alt="volume controls" className="volumeIcon__icon" onMouseEnter={this.volumeControlsShow} onClick={() => {this.setState({volume: 0}, () => {this.volumeChange()})}} />
        </div>
        {this.state.showControls 
          ? <InputRange 
            maxValue={10}
            minValue={0}
            value={this.state.volume}
            onChange={volume => this.setState({ volume }, () => {this.volumeChange()})}
          />
          : null}
      </>
    )
  }
}

export default Music;
