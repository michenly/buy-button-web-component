var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { createStorefrontApiClient, } from '@shopify/storefront-api-client';
import './elements/product-image';
let ShopifyProductElement = class ShopifyProductElement extends LitElement {
    connectedCallback() {
        if (!this.client) {
            this.createClient();
            this.getProduct();
        }
        super.connectedCallback();
    }
    disconnectedCallback() {
        this.client = undefined;
        this.product = undefined;
        super.disconnectedCallback();
    }
    update(changedProperties) {
        if (changedProperties.get('storeDomain') &&
            changedProperties.get('publicAccessToken')) {
            this.client = undefined;
            this.product = undefined;
            this.createClient();
        }
        if (changedProperties.get('productId')) {
            this.product = undefined;
            this.getProduct();
        }
        super.update(changedProperties);
    }
    render() {
        return this.product
            ? html `
          <div
            class="has-image shopify-buy__layout-vertical shopify-buy__product"
          >
            <product-image
              alt-text="${this.product.featuredImage.altText ||
                this.product.title}"
              url="${this.product.featuredImage.url}"
            />
            <h1
              class="shopify-buy__product__title"
              data-element="product.title"
            >
              ${this.product.title}
            </h1>
            <div
              class="shopify-buy__product__price"
              data-element="product.prices"
            >
              <span class="visuallyhidden">Regular price&nbsp;</span>
              <span
                class="shopify-buy__product__actual-price"
                data-element="product.price"
              >
                ${this.product.price}
              </span>
            </div>
            <div
              class="shopify-buy__product__variant-selectors"
              data-element="product.options"
            >
              ${this.product.options.map((option) => html `<div
                  class="shopify-buy__option-select"
                  data-element="option.option"
                >
                  <label
                    for="Option-1706809233400-0"
                    class="shopify-buy__option-select__label "
                    data-element="option.label"
                    >${option.name}</label
                  >
                  <div
                    class="shopify-buy__option-select-wrapper"
                    data-element="option.wrapper"
                  >
                    <select
                      id="Option-1706809233400-0"
                      class="shopify-buy__option-select__select"
                      name="${option.name}"
                      data-element="option.select"
                    >
                      ${option.values.map((value) => html ` <option value="${value}">${value}</option>`)}
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
                </div>`)}
            </div>
            <div
              class="shopify-buy__btn-wrapper"
              data-element="product.buttonWrapper"
            >
              <button class="shopify-buy__btn" data-element="product.button">
                Add to cart
              </button>
            </div>
          </div>
        `
            : html ``;
    }
    createClient() {
        if (this.storeDomain && this.publicAccessToken) {
            try {
                this.client = createStorefrontApiClient({
                    storeDomain: this.storeDomain,
                    publicAccessToken: this.publicAccessToken,
                    apiVersion: '2024-01',
                });
            }
            catch (error) {
                console.error(`createStorefrontApiClient failed with: ${JSON.stringify(error)}`);
            }
        }
    }
    async getProduct() {
        if (this.client && this.productId) {
            try {
                const { data, errors } = await this.client.request(this.getProductQuery(), {
                    variables: {
                        id: `gid://shopify/Product/${this.productId}`,
                    },
                });
                if (errors) {
                    console.error(`Product fetch failed with: ${JSON.stringify(errors)}`);
                }
                if (data?.product) {
                    // console.error(`data?.product=${JSON.stringify(data?.product)}`);
                    this.transformProduct(data?.product);
                }
            }
            catch (error) {
                console.error(`StorefrontApiClient query failed with: ${JSON.stringify(error)}`);
            }
        }
    }
    getProductQuery() {
        return `
      query ProductQuery($id: ID!) {
        product(id: $id) {
          title
          featuredImage {
            altText
            url
          }
          options {
            name
            values
          }
          variants(first: 1) {
            nodes {
              image {
                __typename
                id
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;
    }
    transformProduct(product) {
        this.product = {
            title: product.title,
            featuredImage: product.featuredImage,
            options: product.options,
            price: product.variants.nodes[0].price.amount,
        };
    }
};
__decorate([
    property({
        type: String,
        attribute: 'store-domain',
    })
], ShopifyProductElement.prototype, "storeDomain", void 0);
__decorate([
    property({ type: String, attribute: 'public-access-token' })
], ShopifyProductElement.prototype, "publicAccessToken", void 0);
__decorate([
    property({ type: String, attribute: 'product-id' })
], ShopifyProductElement.prototype, "productId", void 0);
__decorate([
    state()
], ShopifyProductElement.prototype, "client", void 0);
__decorate([
    state()
], ShopifyProductElement.prototype, "product", void 0);
ShopifyProductElement = __decorate([
    customElement('shopify-product')
], ShopifyProductElement);
export { ShopifyProductElement };
//# sourceMappingURL=shopify-product.js.map