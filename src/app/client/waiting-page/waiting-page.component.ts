import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.css']
})
export class WaitingPageComponent {
  email: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve data from the route
    const data = this.route.snapshot.root.firstChild?.data;
    console.log(data);
    if(data){
      this.email = data['email'];
    }
  }
}
