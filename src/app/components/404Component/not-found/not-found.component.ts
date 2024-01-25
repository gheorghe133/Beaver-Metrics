import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <p class="title">404 not found</p>
          <button class="go-back-button" routerLink="/">Go back</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container-hero {
        width: 100%;
        min-height: 400px;
        border: 2px solid #808080;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        position: relative;
        margin-top: 10vh;
      }

      .hero-background {
        width: 100%;
        min-height: 35vh;
        background: linear-gradient(45deg, #3e204a, #91775a);
        filter: blur(1000px);
        position: absolute;
      }

      .hero {
        width: 100%;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: url('/assets/hero.gif');
        height: 100%;
        background-size: cover;
        background-position: center;
        position: absolute;
        border-radius: 5px;
        z-index: 1;
      }

      .hero-body {
        display: flex;
        flex-direction: column;
        gap: 25px;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: #fff;
      }

      .title {
        font-size: 3rem;
        font-weight: 600;
        line-height: 1.125;
        letter-spacing: 8px;
        font-weight: 400;
        word-break: break-word;
        text-align: center;
      }

      .go-back-button {
        border: 2px solid #808080;
        border-radius: 5px;
        color: #fff;
        background-color: transparent;
        cursor: pointer;
        padding-bottom: calc(0.7em - 1px);
        padding-left: 1.5em;
        padding-right: 1.5em;
        padding-top: calc(0.7em - 1px);
        text-align: center;
        white-space: nowrap;
        transition: transform 0.3s ease;
        min-width: 30%;
      }

      .go-back-button:active {
        transform: scale(0.95);
      }

      .go-back-button:hover {
        background-color: #111;
      }

      @media (max-width: 500px) {
        .hero-background {
          filter: blur(100px);
        }

        .title {
          font-size: 1.5rem;
          line-height: 1.7;
          font-weight: 700;
        }
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Beaver Metrics | 404');
  }
}
