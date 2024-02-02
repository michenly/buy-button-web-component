import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('product-buy-button')
export class ProductBuyButtonElement extends LitElement {
  override render() {
    return html`ProductBuyButtonElement`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-buy-button': ProductBuyButtonElement;
  }
}
