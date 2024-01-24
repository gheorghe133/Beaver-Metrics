import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/DataService/data.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../LoaderComponent/loader/loader.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    @if(!loader){
    <div class="container-hero">
      <div class="hero-background"></div>
      <div class="hero">
        <div class="hero-body">
          <img
            class="user-image"
            [src]="userDetails?.user_image"
            [alt]="userDetails?.user_image"
          />

          <div class="user-information">
            <p class="title">{{ userDetails?.username }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-search">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search . . ."
          [(ngModel)]="searchText"
          (input)="searchBeaver()"
        />
      </div>
    </div>
    <div class="container-beavers">
      @for (beaver of userBeavers; track $index) {
      <div class="beaver-card">
        <div class="beaver-image">
          <img src="../../../assets/beaver-image.jpeg" alt="Beaver Image" />
        </div>
        <div class="beaver-information">
          <p>
            Name: <b>{{ beaver.name }}</b>
          </p>
          <p>
            Rarity: <b> {{ beaver.rarity }}</b>
          </p>
          <p>
            Type: <b>{{ beaver.type }}</b>
          </p>
          <p>
            Level: <b>{{ beaver.level }}</b>
          </p>
        </div>
      </div>
      } @empty {
      <div class="container-not-found">
        <h1>Beaver not found</h1>
      </div>
      }
    </div>

    @if(this.userBeavers.length > 11 && !this.searchText && !this.loader){
    <div class="container-pagination">
      @if(loadedItems < beavers.length){
      <button (click)="loadMore()">Load more</button>
      }
    </div>
    } } @else {
    <div class="loader-container">
      <app-loader></app-loader>
    </div>
    }
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
        margin-bottom: 2rem;
        position: relative;
      }

      .hero-background {
        width: 100%;
        min-height: 45vh;
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
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 15px;
        flex-grow: 1;
        flex-shrink: 0;
        color: #fff;
      }

      .hero-body .user-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        user-select: none;
      }

      .title {
        font-size: 2.5rem;
        line-height: 1.125;
        letter-spacing: 8px;
        font-weight: 400;
        word-break: break-word;
        text-align: center;
      }

      .container-beavers {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        grid-gap: 1em 1em;
        width: 100%;
        min-height: 155px;
        height: max-content;
        overflow-y: auto;
        z-index: 1;
        position: relative;
      }

      .container-beavers .beaver-card {
        display: flex;
        align-items: center;
        height: max-content;
        gap: 15px;
        color: #fff;
        border: 2px solid #808080;
        border-radius: 5px;
        padding: 10px;
        cursor: default;
      }

      .container-beavers .beaver-card:hover {
        background-color: #111;
      }

      .container-beavers .beaver-card .beaver-image {
        max-width: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 150px;
      }

      .container-beavers .beaver-card .beaver-image img {
        height: 100%;
        width: 100%;
        max-width: 160px;
        border-radius: 50%;
        user-select: none;
      }

      .container-beavers .beaver-card .beaver-information {
        line-height: 30px;
      }

      .container-beavers .beaver-card .beaver-information b {
        color: #db9769;
      }

      .container-search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 2rem;
        z-index: 1;
      }

      .search-box {
        position: relative;
        height: 45px;
        width: 100%;
      }

      .search-box input {
        position: absolute;
        border: 2px solid #808080;
        background-color: transparent;
        padding: 0 25px 0 45px;
        border-radius: 5px;
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
        outline: none;
      }

      .search-box input::placeholder {
        user-select: none;
        color: #fff;
      }

      .container-search .search-box i {
        position: absolute;
        left: 15px;
        font-size: 18px;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
      }

      .container-not-found {
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 8px;
        color: #fff;
        position: absolute;
      }

      .container-pagination {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }

      .container-pagination button {
        width: 100%;
        font-weight: 500;
        background: transparent;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid #db9769;
        color: #db9769;
        cursor: pointer;
        user-select: none;
        transition: transform 0.3s ease;
      }

      .container-pagination button:active {
        transform: scale(0.95);
      }

      .container-pagination button:hover {
        background-color: #111;
      }

      .loader-container {
        margin-top: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (max-width: 500px) {
        .container-beavers {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

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
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent],
})
export class UserComponent {
  searchText: string = '';
  name: string = '';
  userDetails: any;
  userBeavers: any[] = [];
  beavers: any[] = [];

  loadedItems: number = 12;

  loader: boolean = true;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.name = params['name'];
      this.getUserDetails(this.name);

      this.titleService.setTitle('Beaver Metrics | ' + this.name);
    });
  }

  private getUserDetails(name: string) {
    this.dataService.getUserData(name).subscribe((result) => {
      this.userDetails = result;
      this.beavers = result.beavers;

      this.updateUserBeavers();
      this.loader = false;
    });
  }

  private updateUserBeavers() {
    if (this.searchText) {
      this.userBeavers = this.beavers.filter((beaver) =>
        Object.values(beaver).some((value: any) =>
          value.toString().toLowerCase().includes(this.searchText.toLowerCase())
        )
      );
    } else {
      this.userBeavers = this.beavers.slice(0, this.loadedItems);
    }
  }

  public searchBeaver() {
    this.updateUserBeavers();
  }

  public loadMore() {
    this.loadedItems += 10;
    this.updateUserBeavers();
  }
}
