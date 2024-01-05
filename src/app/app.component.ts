import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <section class="section">
      <div class="container-hero"></div>
      <div class="container-table"></div>
    </section>
  `,
  styles: [
    `
      .section {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        padding: 20px;
      }

      .container-hero {
        width: 100%;
      }

      .container-table {
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'BeaverFrontEnd';
}
