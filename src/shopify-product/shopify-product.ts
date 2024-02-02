import {LitElement, html, nothing, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {
  createStorefrontApiClient,
  type StorefrontApiClient,
} from '@shopify/storefront-api-client';

import './elements/product-image';
import './elements/product-title';
import './elements/product-price';
import './elements/product-options';
import './elements/product-buy-button';

@customElement('shopify-product')
export class ShopifyProductElement extends LitElement {
  static override styles = [
    css`
      :host {
        display: block;
        max-width: 280px;

        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.2;
        color: #4c4c4c;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
    css`
      .shopify-buy__layout-vertical {
        text-align: center;
      }
    `,
  ];

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
    price: {
      amount: string;
      currencyCode: string;
    };
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
    if (!this.product) return nothing;

    return html`
      <div class="has-image shopify-buy__layout-vertical shopify-buy__product">
        <product-image
          alt-text="${this.product.featuredImage.altText || this.product.title}"
          url="${this.product.featuredImage.url}"
        ></product-image>
        <product-title product-title=${this.product.title}></product-title>
        <product-price
          amount="${this.product.price.amount}"
          currency-code="${this.product.price.currencyCode}"
        ></product-price>
        <product-options
          horizontal
          options="${JSON.stringify(this.product.options)}"
        ></product-options>
        <product-buy-button></product-buy-button>
      </div>
    `;
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
      price: product.variants.nodes[0].price,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shopify-product': ShopifyProductElement;
  }
}
