import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  ngAfterViewInit(){
    this.authentication();
  }

  async authentication() : Promise<void>{

      try{
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/auth',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        };

        let res = (await axios(config)).data;
        console.log(res);
        alert("login แล้วจ้า!");
      }catch(error : any){
        console.error(error.response.data);
        alert("โปรดกลับไป login !");
        location.href = location.origin+"/home";
      }

  }
}
