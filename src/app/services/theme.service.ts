import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string = 'light-theme';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(): void {
    let themeLink = this.document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;

    if (this.theme === 'light-theme') {
      this.theme = 'dark-theme';
      themeLink.href = 'dark-theme' + '.css';
      return;
    }
    themeLink.href = 'light-theme' + '.css';
    this.theme = 'light-theme';
  }
}
