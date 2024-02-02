import { LitElement } from 'lit';
import { type StorefrontApiClient } from '@shopify/storefront-api-client';
export declare class ShopifyProductElement extends LitElement {
    static styles: import("lit").CSSResult;
    storeDomain?: string;
    publicAccessToken?: string;
    productId?: string;
    client?: StorefrontApiClient;
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
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: Map<string, any>): void;
    render(): import("lit-html").TemplateResult<1>;
    private createClient;
    private getProduct;
    private getProductQuery;
    private transformProduct;
}
declare global {
    interface HTMLElementTagNameMap {
        'shopify-product': ShopifyProductElement;
    }
}
//# sourceMappingURL=shopify-product.d.ts.map