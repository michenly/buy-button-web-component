import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-title')
export class ProductTitleElement extends LitElement {
  @property({type: String, attribute: 'product-title'})
  productTitle?: string;

  override render() {
    if (!this.productTitle) return;

    return html`<h1
      class="shopify-buy__product__title"
      data-element="product.title"
    >
      ${this.productTitle}
    </h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-title': ProductTitleElement;
  }
}
