import { Component } from '@angular/core';
import { DataService, Product } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  onlineStatus:string = "offline";
  constructor(private data: DataService) {
    if (navigator.onLine) {
      this.onlineStatus = "online";
    }
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getProducts(): Product[] {
    return this.data.getProducts();
  }

}
