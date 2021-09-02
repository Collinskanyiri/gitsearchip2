import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './repository/repository.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'users', component: SearchComponent },
  { path: 'repository', component: RepositoriesComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
