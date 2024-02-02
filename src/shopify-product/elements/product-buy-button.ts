import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('product-buy-button')
export class ProductBuyButtonElement extends LitElement {
  override render() {
    return html`<div
      class="shopify-buy__btn-wrapper"
      data-element="product.buttonWrapper"
    >
      <button class="shopify-buy__btn" data-element="product.button">
        Add to cart
      </button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-buy-button': ProductBuyButtonElement;
  }
}
