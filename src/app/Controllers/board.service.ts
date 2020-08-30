import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private firestore: AngularFirestore) { }

  postCollection(collection: Collection){
    this.firestore.collection('Categories').add(collection).then(x => {
console.log('added Collection');
    }).catch (x => {
console.log('There was an error adding colection');
    })
  }

}
