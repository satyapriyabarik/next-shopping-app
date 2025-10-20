"use client";
import React from "react";
import { Product } from "@/types/Product";

export default function ProductBrief({ product }: { product: Product }) {

    return (

        <>

            <h5 className="fw-semibold mb-2">Care Tips</h5>
            <p className="text-secondary">{product.care}</p>
            <hr />
            <h5 className="fw-semibold mb-2">Reviews</h5>
            <p className="text-secondary">Verified user: {product.reviews[0].userName}</p>
            <p className="text-secondary">Comments: <strong>{product.reviews[0].title}</strong><br />{product.reviews[0].comment}</p>
            <p className="text-secondary">
                These {product.category}s are used primarily for flavoring and garnishing food. They are typically added toward the end of cooking to preserve their delicate flavors.
                Basil: A key ingredient in many Italian and Southeast Asian dishes. It pairs well with tomatoes, garlic, and cheese.
                Coriander/Cilantro: The {product.category} are used in Mexican and Asian cuisine, while the seeds (coriander spice) are popular in curries and spice blends.
                Mint: Known for its cooling flavor, mint is used in drinks, desserts, and savory dishes, including many Middle Eastern and Southeast Asian cuisines.
                Oregano: A staple in Mediterranean cooking, it enhances the flavor of pizzas, pasta sauces, and grilled meats.
                Parsley: A versatile herb used as a garnish or for flavoring in sauces, salads, and egg dishes.
                Rosemary: This pungent herb is frequently used to season roasted meats, fish, and bread.
                Thyme: Often used in soups, stews, and with poultry. It combines well with other herbs like parsley and bay leaves.
            </p>
            <p className="text-secondary">
                <strong > Precautions and considerations</strong><br />
                While natural can imply safety, it is critical to be cautious when using {product.category} supplements, as they are not regulated with the same strictness as pharmaceutical drugs.
                Regulation: In the U.S., the FDA does not approve {product.category} supplements for safety or efficacy before they are sold. Manufacturers are responsible for their own products, and it can take years for unsafe products to be removed from the market.
                Drug interactions: Many herbs can interact with prescription medications, potentially altering their effectiveness or causing dangerous side effects. For example, St. John&apos;s wort can interfere with antidepressants and birth control pills.
                Contaminants: {product.category} products can sometimes be contaminated with heavy metals, pesticides, or other toxins.
                Risk groups: Pregnant or nursing women, children, and individuals with underlying health conditions (such as kidney disease) should exercise extra caution and consult a healthcare provider before using {product.category} supplements.
                Professional guidance: Always speak with a healthcare professional before beginning any {product.category} treatment, especially if you are taking other medications or have a chronic condition. They can help assess potential risks and benefits based on your personal health needs.
            </p>
        </>

    );
}
