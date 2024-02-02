import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './product-option';

@customElement('product-options')
export class ProductOptionsElement extends LitElement {
  @property({type: Array})
  options?: {
    name: string;
    values: string[];
  }[];

  override render() {
    if (!this.options) return nothing;

    return html`<div
      class="shopify-buy__product__variant-selectors"
      data-element="product.options"
    >
      ${this.options.map(
        (option) =>
          html`<product-option
            option="${JSON.stringify(option)}"
          ></product-option>`
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-options': ProductOptionsElement;
  }
}
