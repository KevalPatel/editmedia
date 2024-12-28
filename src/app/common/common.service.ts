import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  NavigateToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  GenerateRandomDigit(): number {
    var min = 1;
    var max = 100000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
