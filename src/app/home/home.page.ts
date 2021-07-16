import { Component } from '@angular/core';
import { DataService, Product } from '../services/data.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  onlineStatus:string;
  constructor(private data: DataService,private network: Network) {

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.onlineStatus = "network was disconnected :-(";
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.onlineStatus = "network connected!";
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.onlineStatus = "we got a wifi connection, woohoo!";
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

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
