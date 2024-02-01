import { LitElement } from 'lit';
export declare class ShopifyProductElement extends LitElement {
    static styles: import("lit").CSSResult;
    domain?: string;
    mode?: string;
    productId?: string;
    product: {
        title: string;
        img: {
            altText: string;
            url: string;
        };
        price: string;
        options: {
            name: string;
            values: string[];
        }[];
    };
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'shopify-product': ShopifyProductElement;
    }
}
//# sourceMappingURL=shopify-product.d.ts.map