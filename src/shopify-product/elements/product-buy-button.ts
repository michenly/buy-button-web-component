import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

@customElement('product-buy-button')
export class ProductBuyButtonElement extends LitElement {
  static override styles = css`
    .shopify-buy__btn-wrapper {
      margin-top: 20px;
      display: inline-block;
    }

    .shopify-buy__btn {
      display: inline-block;
    }

    .shopify-buy__layout-vertical .shopify-buy__btn:first-child,
    .shopify-buy__layout-horizontal .shopify-buy__btn:first-child {
      margin-top: 0;
    }

    .shopify-buy__layout-vertical
      .shopify-buy__btn-and-quantity
      .shopify-buy__btn,
    .shopify-buy__layout-vertical
      .shopify-buy__btn-and-quantity
      .shopify-buy__quantity-container,
    .shopify-buy__layout-horizontal
      .shopify-buy__btn-and-quantity
      .shopify-buy__btn,
    .shopify-buy__layout-horizontal
      .shopify-buy__btn-and-quantity
      .shopify-buy__quantity-container {
      margin: 0 auto;
    }
    .shopify-buy__layout-vertical .shopify-buy__btn-and-quantity:first-child,
    .shopify-buy__layout-horizontal .shopify-buy__btn-and-quantity:first-child {
      margin: 0 auto;
    }

    .shopify-buy__btn {
      color: #fff;
      font-size: 15px;
      background-color: #78b657;
      padding: 12px 40px;
      letter-spacing: 0.3px;
      display: block;
      border-radius: 3px;
      cursor: pointer;
      -webkit-transition: background 200ms ease;
      transition: background 200ms ease;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.2;
      border: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
    }
    .shopify-buy__btn:hover,
    .shopify-buy__btn:focus {
      background-color: #5f9d3e;
    }
    .shopify-buy__btn--parent {
      background-color: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
    }
    .shopify-buy__btn--parent:hover .product__variant-img,
    .shopify-buy__btn--parent:focus .product__variant-img {
      opacity: 0.7;
    }
    .shopify-buy__btn--cart-tab {
      padding: 5px 11px;
      border-radius: 3px 0 0 3px;
      position: fixed;
      right: 0;
      top: 50%;
      -webkit-transform: translate(100%, -50%);
      transform: translate(100%, -50%);
      opacity: 0;
      min-width: inherit;
      width: auto;
      height: auto;
      z-index: 2147483647;
    }
    .shopify-buy__btn--cart-tab.is-active {
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      opacity: 1;
    }
    .shopify-buy__btn__counter {
      display: block;
      margin: 0 auto 10px auto;
      font-size: 18px;
    }
    .shopify-buy__icon-cart--side {
      height: 20px;
      width: 20px;
    }
    .shopify-buy__btn[disabled] {
      background-color: #999;
      pointer-events: none;
    }
    .shopify-buy__btn--close {
      position: absolute;
      right: 9px;
      top: 8px;
      font-size: 35px;
      color: #767676;
      border: none;
      background-color: transparent;
      -webkit-transition: color 100ms ease, -webkit-transform 100ms ease;
      transition: color 100ms ease, -webkit-transform 100ms ease;
      transition: transform 100ms ease, color 100ms ease;
      transition: transform 100ms ease, color 100ms ease,
        -webkit-transform 100ms ease;
      cursor: pointer;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding-right: 9px;
    }
    .shopify-buy__btn--close:hover {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
      color: hsl(0, 0%, 41.2745098039%);
    }
  `;

  @property({type: Boolean})
  horizontal = false;

  override render() {
    return html`<div
      class=${classMap({
        ['shopify-buy__layout-vertical']: !this.horizontal,
        ['shopify-buy__layout-horizontal']: this.horizontal,
        ['shopify-buy__btn-wrapper']: true,
      })}
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
