import { Component } from '@angular/core';
import{AuthService } from './auth.service'

@Component({
  selector: 'nav',
  template: `
  <mat-toolbar>
    <button mat-button routerLink="/">Quiz</button>  
    <span style="flex: 1 1 auto;"></span>
    <button mat-button *ngIf="!auth.isAuthenticated" routerLink="/register">Register</button>  
    <button mat-button *ngIf="!auth.isAuthenticated" routerLink="/login">Login</button>  
    <button mat-button *ngIf="auth.isAuthenticated" (click)="auth.logout()">Logout</button>  
  </mat-toolbar>`
})
export class NavComponent {
  constructor(private auth: AuthService){}
}
