import { Injectable } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database = getFirestore();
  
  constructor() { }
}
