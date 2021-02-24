import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent, LoginRouterComponent } from "./components";

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: LoginRouterComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(LoginRoutes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule { }
