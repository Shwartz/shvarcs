/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2023 - Licensed under MIT
 */

/**
 * Minimal theme switcher
 *
 * @namespace
 */
interface ThemeSwitcher {
  _scheme: string;
  menuTarget: string;
  buttonsTarget: string;
  buttonAttribute: string;
  rootAttribute: string;
  localStorageKey: string;
}
export const ThemeSwitcher = {
  // Config
  _scheme: 'auto',
  menuTarget: "details[role='list']",
  buttonsTarget: 'button[data-id="theme-switcher"]',
  buttonAttribute: 'data-theme-switcher',
  rootAttribute: 'data-theme',
  localStorageKey: 'theme',

  /**
   * Initialize the theme switcher.
   *
   * @function
   * @memberof ThemeSwitcher
   */
  init() {
    this.scheme = this.schemeFromLocalStorage || this.preferredColorScheme;
    this.initSwitchers();
  },

  /**
   * Get the color scheme from local storage or use the preferred color scheme.
   *
   * @function
   * @memberof ThemeSwitcher
   * @returns {string|null} The color scheme ("light", "dark", or null).
   */
  get schemeFromLocalStorage(): string | null {
    if (typeof window.localStorage !== 'undefined') {
      if (window.localStorage.getItem(this.localStorageKey) !== null) {
        return window.localStorage.getItem(this.localStorageKey);
      }
    }
    return this._scheme;
  },

  /**
   * Get the preferred color scheme based on user preferences.
   *
   * @function
   * @memberof ThemeSwitcher
   * @returns {string} The preferred color scheme ("light" or "dark").
   */
  get preferredColorScheme(): string {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * Initialize the theme switcher buttons and their click events.
   *
   * @function
   * @memberof ThemeSwitcher
   */
  initSwitchers() {
    const button = document.querySelector(this.buttonsTarget);
      if (button) {
        button.addEventListener(
          'click',
          (event) => {
            event.preventDefault();
            // Set scheme
            this.scheme = this.scheme === 'light' ? 'dark' : 'light';
          },
          false
        );
        // button.innerHTML = this.scheme;
      }
  },

  /**
   * Set the selected color scheme and update the UI.
   *
   * @function
   * @memberof ThemeSwitcher
   * @param {string} scheme - The color scheme to set ("auto", "light", or "dark").
   */
  set scheme(scheme: string) {
    if (scheme == 'auto') {
      this.preferredColorScheme == 'dark' ? (this._scheme = 'dark') : (this._scheme = 'light');
    } else if (scheme == 'dark' || scheme == 'light') {
      this._scheme = scheme;
    }
    this.applyScheme();
    this.schemeToLocalStorage();
  },

  /**
   * Get the current color scheme.
   *
   * @function
   * @memberof ThemeSwitcher
   * @returns {string} The current color scheme ("auto", "light", or "dark").
   */
  get scheme(): string {
    return this._scheme;
  },

  /**
   * Apply the selected color scheme to the HTML root element.
   *
   * @function
   * @memberof ThemeSwitcher
   */
  applyScheme() {
    document.querySelector('html')?.setAttribute(this.rootAttribute, this.scheme);
  },

  /**
   * Store the selected color scheme in local storage.
   *
   * @function
   * @memberof ThemeSwitcher
   */
  schemeToLocalStorage() {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(this.localStorageKey, this.scheme);
    }
  }
};
