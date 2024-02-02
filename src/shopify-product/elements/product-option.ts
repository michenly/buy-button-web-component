import {LitElement, html, nothing, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-option')
export class ProductOptionElement extends LitElement {
  static override styles = css`
    .shopify-buy__option-select + .shopify-buy__option-select {
      margin-top: 7.5px;
    }
    .shopify-buy__option-select__label {
      display: block;
      font-size: 14px;
      margin-top: 15px;
      margin-bottom: 5px;
    }
    .shopify-buy__btn--parent .shopify-buy__option-select__label {
      cursor: pointer;
    }
    .shopify-buy__option-select__select {
      font-size: inherit;
      padding: 7px 10px;
      padding-right: 32px;
      border: 0;
      width: 100%;
      background: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .shopify-buy__option-select__select::-ms-expand {
      display: none;
    }
    .shopify-buy__btn--parent .shopify-buy__option-select__select {
      cursor: pointer;
    }

    .shopify-buy__option-select-wrapper {
      border: 1px solid #d3dbe2;
      border-radius: 3px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      background: #fff;
      vertical-align: bottom;
    }

    .shopify-buy__select-icon {
      cursor: pointer;
      display: block;
      fill: #798c9c;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -6px;
      pointer-events: none;
      width: 12px;
      height: 12px;
      vertical-align: middle;
    }

    .shopify-buy__option-select__select {
      font-size: inherit;
      padding: 7px 10px;
      padding-right: 32px;
      border: 0;
      width: 100%;
      background: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    .shopify-buy__option-select__select::-ms-expand {
      display: none;
    }
    .shopify-buy__btn--parent .shopify-buy__option-select__select {
      cursor: pointer;
    }
  `;

  @property({type: Object})
  option?: {
    name: string;
    values: string[];
  };

  override render() {
    if (!this.option) return nothing;

    return html`<div
      class="shopify-buy__option-select"
      data-element="option.option"
    >
      <label
        for="Option-1706809233400-0"
        class="shopify-buy__option-select__label "
        data-element="option.label"
        >${this.option.name}</label
      >
      <div
        class="shopify-buy__option-select-wrapper"
        data-element="option.wrapper"
      >
        <select
          id="Option-1706809233400-0"
          class="shopify-buy__option-select__select"
          name="${this.option.name}"
          data-element="option.select"
        >
          ${this.option.values.map(
            (value) => html` <option value="${value}">${value}</option>`
          )}
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
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-option': ProductOptionElement;
  }
}
