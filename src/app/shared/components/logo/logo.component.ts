import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: false
})
export class LogoComponent {
  // Option to change the text color or mode if needed (e.g. 'light' or 'dark')
  @Input() mode: 'dark' | 'light' = 'dark';
  // Allow custom classes
  @Input() customClass = '';
}
