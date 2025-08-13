import {Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

      

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { Blog } from '../blog';


   



@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:3000";

 private apiUrl2 = 'http://localhost:8080/blog';

 

  private searchResultsSubject = new BehaviorSubject<any[]>([]);
      public searchResults$: Observable<any[]> = this.searchResultsSubject.asObservable();


posts:Blog[]   = [];


      

  

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

     

  /*------------------------------------------

  --------------------------------------------

  Created constructor

  --------------------------------------------

  --------------------------------------------*/

  constructor(private httpClient: HttpClient) { }

  getRecordCount(): Observable<number> {
        return this.httpClient.get<number>(`${this.apiUrl2}/count`);
      }
   deleteEntity(id: number): Observable<any> {
       return this.httpClient.delete(this.apiUrl2 + '/' + id, this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )
      }


  updateBlog(id: number, blog: Blog): Observable<Blog> {
        return this.httpClient.put<Blog>(`${this.apiUrl2}/${id}`, blog);
      }

      

getEntities(page: number, size: number, title: string): Observable<any> {
        let params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('title', title);
        return this.httpClient.get<any>(this.apiUrl2 + '/filter', { params });
      }

getAllBlogs(searchTerm: string): Observable<any[]> {
        let params = new HttpParams().set('title', searchTerm);
        return this.httpClient.get<any[]>(this.apiUrl2 +'/search', { params });
      }

 getRecord(id: number): Observable<Blog> {
       return this.httpClient.get<Blog>(`${this.apiUrl2}/${id}`);
        // return this.httpClient.get<Blog>(`${this.apiUrl3}+'/blogs'/+${id}`);
      }

  getAll(): Observable<any>{

   

    return this.httpClient.get(this.apiURL + '/posts/')

    .pipe(

      catchError(this.errorHandler)

    )

  }
  

  getImageUrl(): Observable<string> {

    
 return this.httpClient.get<string>(this.apiURL +'/photos/');
 }
 getImageUrls(): Observable<string> {

    
 return this.httpClient.get<string>(this.apiURL +'/pics/');
 }
//  imageUrls: string[] = [];
//   getImageUrls() {
//       this.httpClient.get<string[]>('http://localhost:3000/photos/1754851400719-nairobi.jpg').subscribe(urls => {
//         // Assign fetched URLs to a component property
//         this.imageUrls = urls; 
//       });
//     }

 

      

  

  create(post:Post): Observable<any> {

   

    return this.httpClient.post(this.apiURL + '/posts/create', JSON.stringify(post), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )

  }  

    title: string='';
  body:string='';
  date:string='';
  slug:string=''

  

  
    

  

  find(id:number): Observable<any> {

  

    return this.httpClient.get(this.apiURL + '/posts/' + id)

    .pipe(

      catchError(this.errorHandler)

    )

  }

  findBlog(id:number): Observable<any> {

  

    return this.httpClient.get(this.apiUrl2 + '/'+id)

    .pipe(

      catchError(this.errorHandler)

    )

  }

    

  

  update(id:number, post:Post): Observable<any> {

  

    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)

    .pipe( 

      catchError(this.errorHandler)

    )

  }

       

 

  delete(id:number){

    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )

  }

      


  errorHandler(error:any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }


}
