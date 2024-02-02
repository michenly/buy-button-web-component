import {LitElement, html, nothing, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import './product-option';

@customElement('product-options')
export class ProductOptionsElement extends LitElement {
  static override styles = css`
    .shopify-buy__product__variant-selectors {
      text-align: left;
      font-size: 14px;
    }

    .shopify-buy__layout-vertical.shopify-buy__product__variant-selectors {
      width: 100%;
      max-width: 280px;
      display: inline-block;
    }
  `;

  @property({type: Boolean})
  horizontal = false;

  @property({type: Array})
  options?: {
    name: string;
    values: string[];
  }[];

  override render() {
    if (!this.options) return nothing;

    return html`<div
      class=${classMap({
        ['shopify-buy__layout-vertical']: !this.horizontal,
        ['shopify-buy__layout-horizontal']: this.horizontal,
        ['shopify-buy__product__variant-selectors']: true,
      })}
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
