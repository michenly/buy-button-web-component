import { LitElement } from 'lit';
export declare class ProductImageElement extends LitElement {
    url?: string;
    altText?: string;
    render(): import("lit-html").TemplateResult<1>;
    private imageForSize;
}
declare global {
    interface HTMLElementTagNameMap {
        'product-image': ProductImageElement;
    }
}
//# sourceMappingURL=product-image.d.ts.map