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
    this.login();
  }

  async callFact(): Promise<void> {
      let test = (await axios.get(`https://catfact.ninja/fact`)).data;
      let fact = document.querySelector("#fact") ;
      fact!.innerHTML = test.fact;
  }

  login() : any {
    document!.querySelector("#login")?.addEventListener("click"
    ,async (e)=>{

      try{
          let username =(<HTMLInputElement> document.querySelector("#username")).value;
          let password = (<HTMLInputElement> document.querySelector("#password")).value;
          console.log(username,password);


          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "username": username,
                "password": password
            })
          };
          
          let res = (await axios(config)).data;
          localStorage.setItem("token",res.token);
          alert("login เสร็จแล้วจ้า");

          location.href = location.origin + "/users";
      }catch(error:any){
          console.error(error.response.data);
          alert("ผิดพลาด");
      }


  })
  }
  
}
