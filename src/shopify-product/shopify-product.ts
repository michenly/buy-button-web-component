import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  createStorefrontApiClient,
  type StorefrontApiClient,
} from '@shopify/storefront-api-client';

import './elements/product-image';

@customElement('shopify-product')
export class ShopifyProductElement extends LitElement {
  @property({
    type: String,
    attribute: 'store-domain',
  })
  storeDomain?: string;

  @property({type: String, attribute: 'public-access-token'})
  publicAccessToken?: string;

  @property({type: String, attribute: 'product-id'})
  productId?: string;

  @state()
  client?: StorefrontApiClient;

  @state()
  product?: {
    title: string;
    featuredImage: {
      altText: string;
      url: string;
    };
    price: string;
    options: {
      name: string;
      values: string[];
    }[];
  };

  override connectedCallback() {
    if (!this.client) {
      this.createClient();
      this.getProduct();
    }
    super.connectedCallback();
  }

  override disconnectedCallback() {
    this.client = undefined;
    this.product = undefined;
    super.disconnectedCallback();
  }

  override update(changedProperties: Map<string, any>) {
    if (
      changedProperties.get('storeDomain') &&
      changedProperties.get('publicAccessToken')
    ) {
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

  override render() {
    return this.product
      ? html`
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
              ${this.product.options.map(
                (option) => html`<div
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
                      ${option.values.map(
                        (value) =>
                          html` <option value="${value}">${value}</option>`
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
                </div>`
              )}
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
      : html``;
  }

  private createClient() {
    if (this.storeDomain && this.publicAccessToken) {
      try {
        this.client = createStorefrontApiClient({
          storeDomain: this.storeDomain,
          publicAccessToken: this.publicAccessToken,
          apiVersion: '2024-01',
        });
      } catch (error) {
        console.error(
          `createStorefrontApiClient failed with: ${JSON.stringify(error)}`
        );
      }
    }
  }

  private async getProduct() {
    if (this.client && this.productId) {
      try {
        const {data, errors} = await this.client.request(
          this.getProductQuery(),
          {
            variables: {
              id: `gid://shopify/Product/${this.productId}`,
            },
          }
        );

        if (errors) {
          console.error(`Product fetch failed with: ${JSON.stringify(errors)}`);
        }

        if (data?.product) {
          // console.error(`data?.product=${JSON.stringify(data?.product)}`);
          this.transformProduct(data?.product);
        }
      } catch (error) {
        console.error(
          `StorefrontApiClient query failed with: ${JSON.stringify(error)}`
        );
      }
    }
  }

  private getProductQuery() {
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

  private transformProduct(product: any) {
    this.product = {
      title: product.title,
      featuredImage: product.featuredImage,
      options: product.options,
      price: product.variants.nodes[0].price.amount,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopify-product': ShopifyProductElement;
  }
}
