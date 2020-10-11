import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private angfirestore: AngularFirestore,
    private toast: ToastrService
  ) {}

  saveCategory(data) {
    this.angfirestore
      .collection('categories')
      .add(data)
      .then((res) => {
        this.toast.success(' 😻 Successfully Saved new category 😻');
      });
  }

  loadCategories(){
    return this.angfirestore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
