import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seller/auth/login/login.component';
import { RegisterComponent } from './seller/auth/register/register.component';
import { PageNotFoundComponent } from './seller/home/page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
