import { PhotosComponent } from './photos/photos.component';
import { ScoringComponent } from './scoring/scoring.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'scoring',
        component: ScoringComponent
      },
      {
        path: 'photos',
        component: PhotosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
