import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PostService } from '../post/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink,RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  //searchForm!:FormGroup;
  blogs = [];
   searchResults: any[] = [];
      searchTerm: string = '';

  constructor(private fb:FormBuilder,
    public postService: PostService
  ){
    
  }
  // ngOnInit(){
  //   this.searchForm = this.fb.group({
  //     title:[]
  //   })
  //   this.getAllBlogs()
  // }
  searchBlogs(){
    this.postService.getAllBlogs(this.searchTerm).subscribe(data => {
          this.searchResults = data;
        });

  }
  // searchBlogs(){
  //  // console.log(this.searchForm.value);
  // }
}
