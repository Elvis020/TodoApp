import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Array<any>;
  color: Array<any> = [
    '#e7845e',
    '#fc0184',
    '#f6b93f',
    '#9224a7',
    '#20c898',
    '#f03734',
    '#aad450',
    '#026467',
    '#fefefe',
    '#928779',
    '#d4d2a5',
    '#fcdebe',
    '#90a583',
    '#b26e63',
    '#c6caed'
  ];
  constructor(private catServ: CategoryService) {}

  ngOnInit() {
    this.catServ.loadCategories().subscribe(val => {
      console.log(val);
      this.categories = val;



    })
  }

  submitForm(f: NgForm) {
    let colorPosition = Math.floor(Math.random() * this.color.length);
    console.log(colorPosition);
    if(f.valid){
      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.color[colorPosition],
        todoCount: 0,
      };
      this.catServ.saveCategory(todoCategory);
      f.reset();
    }
  }
}
