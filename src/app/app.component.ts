import { Component } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, HeaderComponent,FooterComponent,
    RouterLink,RouterModule,FormsModule,CommonModule,ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularBlog';
  searchResults: any[] = [];
      searchTerm: string = '';
}
