/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let ShopifyProductElement = class ShopifyProductElement extends LitElement {
    render() {
        return html `
      <div class="has-image shopify-buy__layout-vertical shopify-buy__product">
        <div
          class="shopify-buy__product-img-wrapper"
          data-element="product.imgWrapper"
        >
          <img
            alt="Half Zip"
            data-element="product.img"
            class="shopify-buy__product__variant-img"
            src="https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenHalfzip01_550x825.jpg?v=1675455104"
          />
        </div>
        <h1 class="shopify-buy__product__title" data-element="product.title">
          Half Zip
        </h1>
        <div class="shopify-buy__product__price" data-element="product.prices">
          <span class="visuallyhidden">Regular price&nbsp;</span>
          <span
            class="shopify-buy__product__actual-price "
            data-element="product.price"
            >$100.00</span
          >
        </div>
        <div
          class="shopify-buy__product__variant-selectors"
          data-element="product.options"
        >
          <div class="shopify-buy__option-select" data-element="option.option">
            <label
              for="Option-1706809233400-0"
              class="shopify-buy__option-select__label "
              data-element="option.label"
              >Size</label
            >
            <div
              class="shopify-buy__option-select-wrapper"
              data-element="option.wrapper"
            >
              <select
                id="Option-1706809233400-0"
                class="shopify-buy__option-select__select"
                name="Size"
                data-element="option.select"
              >
                <option selected="" value="Small">Small</option>
                <option value="Large">Large</option>
              </select>
              <svg
                class="shopify-buy__select-icon"
                data-element="option.selectIcon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="shopify-buy__option-select" data-element="option.option">
            <label
              for="Option-1706809233400-1"
              class="shopify-buy__option-select__label "
              data-element="option.label"
              >Color</label
            >
            <div
              class="shopify-buy__option-select-wrapper"
              data-element="option.wrapper"
            >
              <select
                id="Option-1706809233400-1"
                class="shopify-buy__option-select__select"
                name="Color"
                data-element="option.select"
              >
                <option selected="" value="Green">Green</option>
                <option value="Olive">Olive</option>
                <option value="Ocean">Ocean</option>
                <option value="Purple">Purple</option>
                <option value="Red">Red</option>
              </select>
              <svg
                class="shopify-buy__select-icon"
                data-element="option.selectIcon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 5.176l-9.086 9.353L3 5.176.686 7.647 12 19.382 23.314 7.647 21 5.176z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div
          class="shopify-buy__btn-wrapper"
          data-element="product.buttonWrapper"
        >
          <button class="shopify-buy__btn  " data-element="product.button">
            Add to cart
          </button>
        </div>
      </div>
    `;
    }
};
ShopifyProductElement.styles = css `
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
ShopifyProductElement = __decorate([
    customElement('shopify-product')
], ShopifyProductElement);
export { ShopifyProductElement };
//# sourceMappingURL=shopify-product.js.map