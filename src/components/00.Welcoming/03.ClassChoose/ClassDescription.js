import React, {Component} from 'react';

class ClassDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  scaleRender = (amount, character) => {
    let charsArr = [];
    let charsAmount = amount;
    while(charsAmount > 0) {
      charsArr.push(<span className={'classDescription__scaleEl classDescription__scaleEl_' + character}></span>);
      charsAmount--;
    }
    return charsArr;
  }

  render() {
    return(
      <section className={'classDescription classChoose__classDescription ' + this.props.shadowwer}>
        <h2 className='classDescription__heroClass'>{this.props.heroClass}</h2>
        <section className='classDescription__descriptionContainer'>
          <article className='classDescription__heroContainer'>
            <span className='classDescription__nameText'>Name during life:</span>
            <h3 className='classDescription__name'>{this.props.heroName}</h3>
          </article>
          <article className='classDescription__phantasmContainer'>
            <span className='classDescription__phantasmText'>Noble phantasm:</span>
            <h4 className='classDescription__phantasmName'>{this.props.phantasmName}</h4>
            <p className='classDescription__phantasmShortDescription'>{this.props.phantasmDescription}</p>
          </article>
        </section>
        <section className='classDescription__charactersContainer'>
          <h3 className='classDescription__charactersName'>Characters:</h3>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Сила:</span>
            <div className='classDescription__scale classDescription__strength_scale'>
              {this.scaleRender(this.props.characters.strength, 'strength')}
            </div>
          </div>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Ловкость:</span>
            <div className='classDescription__scale classDescription__dexterity_scale'>
              {this.scaleRender(this.props.characters.dexterity, 'dexterity')}
            </div>
          </div>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Выносливость:</span>
            <div className='classDescription__scale classDescription__endurance_scale'>
              {this.scaleRender(this.props.characters.endurance, 'endurance')}
            </div>
          </div>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Интеллект:</span>
            <div className='classDescription__scale classDescription__intelligence_scale'>
              {this.scaleRender(this.props.characters.intelligence, 'intelligence')}
            </div>
          </div>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Мудрость:</span>
            <div className='classDescription__scale classDescription__wisdom_scale'>
              {this.scaleRender(this.props.characters.wisdom, 'wisdom')}
            </div>
          </div>
          <div className='classDescription__charScaleContainer'>
            <span className='classDescription__scaleText'>Харизма:</span>
            <div className='classDescription__scale classDescription__charm_scale'>
              {this.scaleRender(this.props.characters.charm, 'charm')}
            </div>
          </div>
        </section>
        <form method='POST' action='#' className='classDescription__submitForm'>
          <button className='classDescription__submit' onClick={this.props.submiter}>Accept</button>
        </form>
      </section>
    )
  }
}

export default ClassDescription;