var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ProductImageElement = class ProductImageElement extends LitElement {
    render() {
        if (this.url) {
            const src = this.imageForSize(this.url);
            return html `<div
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
        else {
            return html ``;
        }
    }
    // From
    // buy-button-js: https://github.com/Shopify/buy-button-js/blob/0b19fdeaa15e5fcb47bb67d7a4a3454bda2caa43/src/components/product.js#L114 &
    // JS-BUY-SDK: https://github.com/Shopify/js-buy-sdk/blob/bdd3dd75a667742695ae6c0991eabff3cd24f4d4/src/image-helpers.js#L21
    imageForSize(url) {
        const DEFAULT_IMAGE_SIZE = 550;
        const maxWidth = DEFAULT_IMAGE_SIZE;
        const maxHeight = DEFAULT_IMAGE_SIZE * 1.5;
        const src = new URL(url);
        // Use the section before the query
        const imageTokens = src.pathname.split('.');
        // Take the token before the file extension and append the dimensions
        const imagePathIndex = imageTokens.length - 2;
        imageTokens[imagePathIndex] = `${imageTokens[imagePathIndex]}_${maxWidth}x${maxHeight}`;
        src.pathname = imageTokens.join('.');
        return src.toString();
    }
};
__decorate([
    property({ type: String })
], ProductImageElement.prototype, "url", void 0);
__decorate([
    property({ type: String, attribute: 'alt-text' })
], ProductImageElement.prototype, "altText", void 0);
ProductImageElement = __decorate([
    customElement('product-image')
], ProductImageElement);
export { ProductImageElement };
//# sourceMappingURL=product-image.js.map