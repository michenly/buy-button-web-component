import {LitElement, html, nothing, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-price')
export class ProductPriceElement extends LitElement {
  static override styles = [
    css`
      .shopify-buy__product__price {
        margin-bottom: 15px;
      }

      .visuallyhidden {
        border: 0;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .shopify-buy__product__actual-price,
      .shopify-buy__product__compare-price {
        color: #4a4a4a;
        display: inline-block;
      }
      .shopify-buy__product__actual-price {
        font-size: 14px;
      }
    `,
  ];

  @property({type: String})
  amount?: string;

  @property({type: String, attribute: 'currency-code'})
  currencyCode?: string;

  override render() {
    if (!this.amount) return nothing;

    return html` <div
      class="shopify-buy__product__price"
      data-element="product.prices"
    >
      <span class="visuallyhidden">Regular price&nbsp;</span>
      <span
        class="shopify-buy__product__actual-price"
        data-element="product.price"
      >
        ${this.amount}
      </span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-price': ProductPriceElement;
  }
}
