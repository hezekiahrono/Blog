import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Post } from '../post/post';
import { PostService } from '../post/post.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogPosts } from '../blog-posts';
import { Blog } from '../blog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TruncatePipe } from '../truncate.pipe';



@Component({
  selector: 'app-home',
  
  imports: [FooterComponent, CommonModule, RouterModule,
    RouterLink,RouterModule,FormsModule,CommonModule,ReactiveFormsModule,
    MatPaginatorModule,TruncatePipe
   
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  
   //products: any[] = [];
          totalElements = 0;
          pageSize = 3;
          pageNumber = 0;
          title='id';

          @ViewChild(MatPaginator) paginator!: MatPaginator;

  myDate: Date = new Date();

//   imageUrls: string = '';
 image: string[] = [];
// imageUrls: string[] = [];

blogs = [];
   searchResults: any[] = [];
      searchTerm: string = '';

      

  // posts:Post[]   = [];
     posts:Blog[]   = [];
   urls:BlogPosts[] =[];
   constructor(
    private http: HttpClient,
    public postService: PostService, private router: Router) { 
     
    }

   ngOnInit(): void {

 this.getBlogs();


    this.http.get<Blog[]>("http://localhost:8080/blog")
        .subscribe(response=>{
           this.posts = response;
           console.log(this.posts);
        }, 
         
          error=>{
          console.log("Error while fetching record");
        })

        
        
   
  
  }
  

  searchBlogs(){
    this.postService.getAllBlogs(this.searchTerm).subscribe(data => {
          this.searchResults = data;
        });

  }

  getBlogs(): void {
            this.postService.getEntities(this.pageNumber, this.pageSize, this.title)
              .subscribe(response => {
                this.posts = response.content;
                this.totalElements = response.totalElements;
              });
          }

          onPageChange(event: PageEvent): void {
            this.pageNumber = event.pageIndex;
            this.pageSize = event.pageSize;
            this.getBlogs();
          }


    

  }


