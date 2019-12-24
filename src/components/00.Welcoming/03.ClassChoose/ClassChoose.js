import React, {Component} from 'react';
import Swiper from 'swiper';
import data, {actor} from '../../../data/data';
import {startPersonsCharacters, personDescriptionsFem} from '../../../data/DefaultPersons';

import ClassDescription from './ClassDescription';

class ClassChoose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeClass: personDescriptionsFem[0].class,
      activeName: personDescriptionsFem[0].name,
      activePhantasmName: personDescriptionsFem[0].phantasmName,
      activePhantasmDescription: personDescriptionsFem[0].phantasmDescription,
      characters: startPersonsCharacters[0],
      shadowwed: '',
    }

    this.swiperContainer = React.createRef();
    this.buttonPrev = React.createRef();
    this.buttonNext = React.createRef();
    this.swiper = null;
  }

  activeSlide = () => {
    this.setState({
      activeClass: personDescriptionsFem[this.swiper.realIndex].class,
      activeName: personDescriptionsFem[this.swiper.realIndex].name,
      activePhantasmName: personDescriptionsFem[this.swiper.realIndex].phantasmName,
      activePhantasmDescription: personDescriptionsFem[this.swiper.realIndex].phantasmDescription,
      characters: startPersonsCharacters[this.swiper.realIndex],
    }) 
  }

  componentDidMount() {
    this.swiper = new Swiper(this.swiperContainer.current, {
      init: true,
      speed: 400,
      loop: true,
      slidesPerView: 3,
      spaceBetween: 50,
      effect: 'coverflow',
      centeredSlides: true,
      loopedSlides: 7,
      touchMoveStopPropagation: true,
      grabCursor: true,
      shortSwipes: false,
      longSwipes: false,
      on: {
        slideChange: () => {
          this.activeSlide();
        }
      },
    })
  }

  paramsSaver = (event) => {
    event.preventDefault();

    actor.characters = this.state.characters;
    actor.class = this.state.activeClass;
    this.setState({
      shadowwed: 'toShadows'
    }, () => {
      setTimeout(() => {
        this.props.submit();
      }, 1000)
    })
  }

  render() {
    return (
      <>
        <div className={'swiper-container classChoose ' + this.state.shadowwed} ref={this.swiperContainer}>
          <div className='swiper-wrapper classChoose__container'>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__lancerMask"></span>
            <img src={data.classImagesFem.classFemLancer} alt='lancer' className='classChoose__classImg classChoose__classImg_lancer'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__assassinMask"></span>
            <img src={data.classImagesFem.classFemAssassin} alt='assassin' className='classChoose__classImg classChoose__classImg_assassin'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__berserkMask"></span>
            <img src={data.classImagesFem.classFemBerserk} alt='berserker' className='classChoose__classImg classChoose__classImg_berserk'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__riderMask"></span>
            <img src={data.classImagesFem.classFemRider} alt='rider' className='classChoose__classImg classChoose__classImg_rider'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__casterMask"></span>
            <img src={data.classImagesFem.classFemCaster} alt='caster' className='classChoose__classImg classChoose__classImg_caster'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__saberMask"></span>
            <img src={data.classImagesFem.classFemSaber} alt='saber' className='classChoose__classImg classChoose__classImg_saber'></img>
          </div>
          <div className='swiper-slide'>
            <span className="classChoose__mask classChoose__archerMask"></span>
            <img src={data.classImagesFem.classFemArcher} alt='archer' className='classChoose__classImg classChoose__classImg_archer'></img>
          </div>
          </div>
        </div>
        <ClassDescription 
          heroClass={this.state.activeClass} 
          heroName={this.state.activeName} 
          phantasmName={this.state.activePhantasmName}
          phantasmDescription={this.state.activePhantasmDescription}
          characters={this.state.characters}
          submiter={this.paramsSaver}
          shadowwer={this.state.shadowwed}>
        </ClassDescription>
      </>
    )
  }
}

export default ClassChoose;