import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-option')
export class ProductOptionElement extends LitElement {
  @property({type: Object})
  option?: {
    name: string;
    values: string[];
  };

  override render() {
    if (!this.option) return;

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
