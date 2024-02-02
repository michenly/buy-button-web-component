import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('product-image')
export class ProductImageElement extends LitElement {
  @property({type: String})
  url?: string;

  @property({type: String, attribute: 'alt-text'})
  altText?: string;

  override render() {
    if (!this.url) return nothing;

    const src = this.imageForSize(this.url);

    return html`<div
      class="shopify-buy__product-img-wrapper"
      data-element="product.imgWrapper"
    >
      <img
        alt="${this.altText}"
        data-element="product.img"
        class="shopify-buy__product__variant-img"
        src="${src}"
      />
    </div>`;
  }

  // From
  // buy-button-js: https://github.com/Shopify/buy-button-js/blob/0b19fdeaa15e5fcb47bb67d7a4a3454bda2caa43/src/components/product.js#L114 &
  // JS-BUY-SDK: https://github.com/Shopify/js-buy-sdk/blob/bdd3dd75a667742695ae6c0991eabff3cd24f4d4/src/image-helpers.js#L21
  private imageForSize(url: string) {
    const DEFAULT_IMAGE_SIZE = 550;
    const maxWidth = DEFAULT_IMAGE_SIZE;
    const maxHeight = DEFAULT_IMAGE_SIZE * 1.5;

    const src = new URL(url);

    // Use the section before the query
    const imageTokens = src.pathname.split('.');

    // Take the token before the file extension and append the dimensions
    const imagePathIndex = imageTokens.length - 2;

    imageTokens[
      imagePathIndex
    ] = `${imageTokens[imagePathIndex]}_${maxWidth}x${maxHeight}`;

    src.pathname = imageTokens.join('.');

    return src.toString();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'product-image': ProductImageElement;
  }
}
