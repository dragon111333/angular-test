import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title:String = 'พ่อมึงตาย';

  ngAfterViewInit() {
    this.callFact();
  }

  async callFact(): Promise<void> {
      let test = (await axios.get(`https://catfact.ninja/fact`)).data;
      let fact = document.querySelector("#fact") ;
      fact!.innerHTML = test.fact;
  }
  
}
