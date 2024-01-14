import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="section">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [],
})
export class AppComponent {
  title = 'BeaverFrontEnd';
}
