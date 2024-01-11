import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <section class="section">
      <div class="container-hero">
        <div class="hero">
          <div class="hero-body">
            <p class="title">Beaver FrontEnd</p>
            <p class="subtitle">Users metrics</p>
          </div>
        </div>
      </div>
      <div class="container-search">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div class="container-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Best Beaver</th>
              <th>Rare Beavers</th>
              <th>Total Beavers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="user-image">
                  <div>
                    <img src="https://i.pravatar.cc/150?img=1" alt="" />
                  </div>
                  <div>nyaqu</div>
                </div>
              </td>
              <td>Руслан &#8226; Diamond &#8226; 74 &#8226; Dragon</td>
              <td>10</td>
              <td>23</td>
            </tr>
            <tr>
              <td>
                <div class="user-image">
                  <div>
                    <img src="https://i.pravatar.cc/150?img=1" alt="" />
                  </div>
                  <div>nyaqu</div>
                </div>
              </td>
              <td>Руслан &#8226; Diamond &#8226; 74 &#8226; Dragon</td>
              <td>10</td>
              <td>23</td>
            </tr>
            <tr>
              <td>
                <div class="user-image">
                  <div>
                    <img src="https://i.pravatar.cc/150?img=1" alt="" />
                  </div>
                  <div>nyaqu</div>
                </div>
              </td>
              <td>Руслан &#8226; Diamond &#8226; 74 &#8226; Dragon</td>
              <td>10</td>
              <td>23</td>
            </tr>
            <tr>
              <td>
                <div class="user-image">
                  <div>
                    <img src="https://i.pravatar.cc/150?img=1" alt="" />
                  </div>
                  <div>nyaqu</div>
                </div>
              </td>
              <td>Руслан &#8226; Diamond &#8226; 74 &#8226; Dragon</td>
              <td>10</td>
              <td>23</td>
            </tr>
            <tr>
              <td>
                <div class="user-image">
                  <div>
                    <img src="https://i.pravatar.cc/150?img=1" alt="" />
                  </div>
                  <div>nyaqu</div>
                </div>
              </td>
              <td>Руслан &#8226; Diamond &#8226; 74 &#8226; Dragon</td>
              <td>10</td>
              <td>23</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        padding: 30px;
      }

      .container-hero {
        width: 100%;
        min-height: 35vh;
        border: 2px solid #1e293b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 20px;
      }

      .hero {
        width: 100%;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .hero-body {
        flex-grow: 1;
        flex-shrink: 0;
        padding: 9rem 4.5rem;
        color: #fff;
      }

      .title {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.125;
        word-break: break-word;
      }

      .subtitle {
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.25;
        margin-top: 0.5rem;
      }

      .container-table {
        width: 100%;
        overflow-y: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #0f172a;
        color: #94a3b8;
        border-radius: 10px 10px 0px 0px;
      }

      th,
      td {
        padding: 0.5rem;
        text-align: left;
        border: 2px solid #1e293b;
        color: #94a3b8;
      }

      th {
        text-transform: uppercase;
        font-size: 0.75rem;
      }

      .user-image {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .container-search {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
      }

      .search-box {
        position: relative;
        height: 45px;
        width: 100%;
      }

      .search-box input {
        position: absolute;
        border: 2px solid #1e293b;
        background-color: transparent;
        padding: 0 25px 0 45px;
        border-radius: 5px;
        height: 100%;
        width: 100%;
        color: #94a3b8;
        font-size: 15px;
        font-weight: 400;
        outline: none;
      }

      .search-box input::placeholder {
        color: #94a3b8;
      }

      .container-search .search-box i {
        position: absolute;
        left: 15px;
        font-size: 18px;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
      }
    `,
  ],
})
export class AppComponent {
  title = 'BeaverFrontEnd';
}
