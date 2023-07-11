import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponentComponent {

  constructor(private userService: UserService) { }

}