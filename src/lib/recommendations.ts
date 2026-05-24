import type { Product } from "@/types";

export function getRecommendations(
  allProducts: Product[],
  cartProductIds: string[],
  limit = 4
): Product[] {
  if (cartProductIds.length === 0) {
    return allProducts
      .filter((p) => p.isBestSeller)
      .slice(0, limit);
  }

  const cartCategories = new Set(
    allProducts
      .filter((p) => cartProductIds.includes(p._id))
      .map((p) => p.category)
  );

  const scored = allProducts
    .filter((p) => !cartProductIds.includes(p._id))
    .map((p) => {
      let score = p.rating * 2;
      if (p.isBestSeller) score += 3;
      if (cartCategories.has(p.category)) score += 2;
      if (p.isFreshDaily) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
