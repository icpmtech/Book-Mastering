import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.less']
})
export class MyComponentComponent {
  title = 'Hello, world!';

  sayHello() {
    alert('Hello, world!');
  }
}
