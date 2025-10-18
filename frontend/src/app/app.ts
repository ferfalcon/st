import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from './api.config';

interface GreetingResponse {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('Angular + Fastify Starter');
  protected readonly greeting = signal<string | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.loadGreeting();
  }

  protected async loadGreeting(name?: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.get<GreetingResponse>(`${API_BASE_URL}/greetings`, {
          params: name ? { name } : {}
        })
      );
      this.greeting.set(response.message);
    } catch (err) {
      console.error('Failed to load greeting', err);
      this.error.set('Unable to reach the backend. Make sure it is running.');
    } finally {
      this.loading.set(false);
    }
  }
}
