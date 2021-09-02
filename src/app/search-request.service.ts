import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Repository } from './repository';
import { User } from './user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class SearchRequestService {
  repository: Repository;
  users: User;
  newRepository: any;
  searchRepo: any;

  constructor(private http: HttpClient) {
    this.repository = new Repository('', '', '', new Date());
    this.users = new User('', '', '', 0, '', new Date(), 0, 0);
  }

  githubUser(searchName: string) {
    interface ApiResponse {
      name: string;
      html_url: string;
      description: string;
      created_at: Date;
      login: string;
      public_repos: number;
      followers: number;
      following: number;
      avatar_url: string;
    }

    const promise = new Promise<void>((resolve) => {
      this.http
        .get<ApiResponse>(
          'https://api.github.com/users/' +
            searchName +
            '?access_token=' +
            environment.myApi
        )
        .toPromise()
        .then((getResponse) => {
          this.users.name = getResponse.name;
          this.users.html_url = getResponse.html_url;
          this.users.login = getResponse.login;
          this.users.avatar_url = getResponse.avatar_url;
          this.users.public_repos = getResponse.public_repos;
          this.users.created_at = getResponse.created_at;
          this.users.followers = getResponse.followers;
          this.users.following = getResponse.following;
          resolve();
        });
    });
    return promise;
  }

  gitUserRepos(searchMe: string) {
    interface ApiResponse {
      name: string;
      description: string;
      created_at: Date;
    }

    const myPromise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiResponse>(
          'https://api.github.com/users/' +
            searchMe +
            '/repos?order=created&sort=asc?access_token=' +
            environment.myApi
        )
        .toPromise()
        .then(
          (getRepoResponse) => {
            this.newRepository = getRepoResponse;
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
    return myPromise;
  }

  gitRepos(searchRepo: string) {
    interface ApiResponse {
      name: string;
      html_url: string;
      description: string;
      created_at: Date;
    }

    const repopromise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiResponse>(
          'https://api.github.com/repository/' +
            searchRepo +
            '/repos?access_token=' +
            environment.myApi
        )
        .toPromise()
        .then(
          (getRepoResponse) => {
            this.searchRepo = getRepoResponse ;
            this.repository.name = getRepoResponse.name;
            this.repository.html_url = getRepoResponse.html_url;
            this.repository.description = getRepoResponse.description;
            this.repository.created_at = getRepoResponse.created_at;

            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });

    return repopromise;
  }
}
