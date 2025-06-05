import type { OnInit, WritableSignal } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog'
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'onboarding-task';
  public loading: WritableSignal<boolean> = signal(false);
  private readonly loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.listenToLoading();
  }

  private listenToLoading(): void {
    this.loadingService.isLoading()
      .pipe(delay(0))
      .subscribe(load =>
        this.loading.set(load)
      );
  }

}
