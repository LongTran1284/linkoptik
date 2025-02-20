import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template: `
    <h1>This page does not exist</h1>
    <a href="#">Back to Homepage</a>
  `,
})
export class NotFoundComponent {

}
