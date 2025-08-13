import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post/post.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog } from '../blog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-blog',
  imports: [RouterLink,RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './search-blog.component.html',
  styleUrl: './search-blog.component.css'
})
export class SearchBlogComponent {

  recordCount: number | undefined;
  //searchForm!:FormGroup;
  blogs = [];
   posts:Blog[]   = [];
   searchResults: any[] = [];
      searchTerm: string = '';

  constructor(private fb:FormBuilder,
    public postService: PostService,
    private http: HttpClient,
  ){
    
  }
  ngOnInit(): void {


    this.http.get<Blog[]>("http://localhost:8080/blog")
        .subscribe(response=>{
           this.posts = response;
           console.log(this.posts);
        }, 
         
          error=>{
          console.log("Error while fetching record");
        })

        this.postService.getRecordCount().subscribe(count => {
          this.recordCount = count;
           });
    // console.log(this.router.url);

    // console.log( window.location.href);

    // this.postService.getAll().subscribe((data: Post[])=>{

    //   this.posts = data;

    //   console.log(this.posts);

    // }) 
    //  this.http.get<string[]>('http://localhost:3000/pics').subscribe(urls => {
    //         this.image = urls;
    //         JSON.stringify(urls) ;
    //         console.log(">>>>"+(this.image));
    //     });
  
  }
   isSearched: boolean = true; 
  searchBlogs(){
    this.postService.getAllBlogs(this.searchTerm).subscribe(data => {
          this.searchResults = data;
        });

  }
  // searchBlogs(){
  //  // console.log(this.searchForm.value);
  // }

}
