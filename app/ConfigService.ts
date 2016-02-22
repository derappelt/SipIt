import {Injectable} from 'angular2/core';

@Injectable()
export class ConfigService {
  minSips: number;
  maxSips: number;  
  drinkOrDeal: string;
  
  constructor() {
    var config = JSON.parse(localStorage.getItem('config'));
    if (config) {
      this.minSips = config.minSips;
      this.maxSips = config.maxSips;
      this.drinkOrDeal = config.drinkOrDeal;
      console.log(config);
    } else {
      this.minSips = 1;
      this.maxSips = 3;
      this.drinkOrDeal = 'both';
      localStorage.setItem('config', JSON.stringify(this));
    }
  }
  update(){
    this.minSips = parseInt(`${this.minSips}`);
    this.maxSips = parseInt(`${this.maxSips}`);
    localStorage.setItem('config', JSON.stringify(this));
  }

}