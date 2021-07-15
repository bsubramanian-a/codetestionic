import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Product {
  id: number;
  image_path:string;
  property_name:string;
  default_pic:string;
  property_latitude: string;
  property_longitude:string;
  num_bedroom:number;
  num_bathroom:number;
  num_carparking:number;
  upper_price_value:string;
  middle_price_value:string;
  bottom_price_value:string;
  property_type:string;
  available_for:string;
  short_description:string;
  landsize_approx:string;
  buildings_approx:string;
  property_desc:string;
  country:string;
  state:string;
  city:string;
  area:string;
  fullname:string;
  contact_number:string;
  company_name:string;
  company_logo:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public products: Product[];
  private url = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) {
    this.getList().subscribe((res: any) => {
         console.log(res);
         this.products = res;
    })
  }

  getList() {
    return this.httpClient.get<Product[]>(this.url)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: number): Product {
    let p = this.products.filter((pr => pr.id == id));
    return p[0];
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
