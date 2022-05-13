import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  level!: string;
  word!: string;

  constructor() { }

  getLevel(): string {
    return this.level;
  }

  getWord(): string {
    return this.word;
  }

  setLevel(level: string) {
    this.level = level;
  }

  setWord(word: string) {
    this.word = word;
  }

}
