import {Injectable} from 'angular2/core';

@Injectable()
export class ConfigService {
  minSips: number;
  maxSips: number;  
  drinkOrDeal: string;
  autoPlayTime: number;
  
  constructor() {
    var config = JSON.parse(localStorage.getItem('config'));
    if (config) {
      this.minSips = config.minSips;
      this.maxSips = config.maxSips;
      this.drinkOrDeal = config.drinkOrDeal;
      this.autoPlayTime = config.autoPlayTime;
    } else {
      this.minSips = 1;
      this.maxSips = 3;
      this.drinkOrDeal = 'both';
      this.autoPlayTime = 5000;
      this.update();
    }
  }
  update(){
    this.minSips = parseInt(`${this.minSips}`);
    this.maxSips = parseInt(`${this.maxSips}`);
    localStorage.setItem('config', JSON.stringify(this));
  }
}