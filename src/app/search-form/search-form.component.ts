import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Search } from '../search';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  searchInfo = new Search('');
  @Output() getName = new EventEmitter<Search>();

  searchFor(
    data: { value: { find: Search}; reset: () => void }) {
    this.getName.emit(data.value.find);
    console.log(data.value.find);
    data.reset();
  }

  constructor() {}

  ngOnInit() {}
}
