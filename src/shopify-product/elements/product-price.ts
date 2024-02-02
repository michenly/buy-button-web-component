import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-price')
export class ProductPriceElement extends LitElement {
  @property({type: String, attribute: 'price'})
  price?: string;

  @property({type: String, attribute: 'currency-code'})
  currencyCode?: string;

  override render() {
    if (!this.price) return;

    return html` <div
      class="shopify-buy__product__price"
      data-element="product.prices"
    >
      <span class="visuallyhidden">Regular price&nbsp;</span>
      <span
        class="shopify-buy__product__actual-price"
        data-element="product.price"
      >
        ${this.price}
      </span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-price': ProductPriceElement;
  }
}
