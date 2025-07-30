export const revalidate = 604800;

import { getProductSlug } from "@/actions/products/get-product-slug";
import { titleFont } from "@/app/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: ProductDetailPageProps,
): Promise<Metadata> {
  const slug = (await params).slug

  const product = await getProductSlug(slug);

  return {
    title: product?.title ?? "Producto",
    description: product?.description ?? "Descripción del producto",
    openGraph: {
      title: product?.title ?? "Producto",
      description: product?.description ?? "Descripción del producto",
      images: [`/products/${product?.images[1]}`]
    },
  }
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const product = await getProductSlug(slug);


  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />
        {/* Desktop */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        <AddToCart product={product} />
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
