import './DefaultPersons';
import classFemLancer from './personsImages/class-persons/femLancer.png';
import classFemAssassin from './personsImages/class-persons/femAssassin.png';
import classFemBerserk from './personsImages/class-persons/femBerserk.png';
import classFemRider from './personsImages/class-persons/femRider.png';
import classFemCaster from './personsImages/class-persons/femCaster.png';
import classFemSaber from './personsImages/class-persons/femSaber.png';
import classFemArcher from './personsImages/class-persons/femArcher.png';
import KotomineKirei from './personsImages/KotomineKirei.png';

class Actor {
  constructor() {
    this.name = '';
    this.sex = '';
    this.class = null;
    this.characters = {

    };
    this.reputation = 0;
    this.good = 0;
    this.evil = 0;
    this.progress = 0;
    this.inventory = [];
    this.difficulty = 0;
  }

  getActorName = () => {
    return this.name;
  };

  getActorSex = () => {
    return this.sex;
  };

  setActorName = (name) => {
    this.name = name;
  };

  setActorSex = (sex) => {
    this.sex = sex;
  };
}

export const actor = new Actor();

class HeroShortDescription {
  constructor(heroClass, heroName, phantasm, phantasmDecription, characters) {
    this.heroClass = heroClass;
    this.heroName = heroName;
    this.phantasm = phantasm;
    this.phantasmDecription = phantasmDecription;
    this.characters = characters;
  }
};

const data = {
  actor,
  personImages : {
    KotomineKirei,
  },
  classImagesFem: {
    classFemLancer,
    classFemAssassin,
    classFemBerserk,
    classFemRider,
    classFemCaster,
    classFemSaber,
    classFemArcher
  },
}

export default data;