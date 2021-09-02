import { Component, OnInit } from '@angular/core';
import { SearchRequestService } from '../search-request.service';
import { Repository } from '../repository';

@Component({
  selector: 'app-repositories',
  templateUrl: './repository.component.html',
  providers: [SearchRequestService],
  styleUrls: ['./repository.component.css'],
})
export class RepositoriesComponent implements OnInit {
  repository!: Repository;
  public searchRepo!: string;
  public resultCount = 12;

  searchRepos() {
    this.searchRepo = '';
    this.resultCount = 10;
    this.getDataFunction();
  }

  constructor(public getRepoResponse: SearchRequestService) {}

  ngOnInit() {
    this.getRepoResponse.gitRepos(this.searchRepo);
  }

  getDataFunction() {
    this.getRepoResponse.gitRepos(this.searchRepo);
  }
}
