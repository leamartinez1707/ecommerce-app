import { titleFont } from "@/app/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { initialData } from "@/seed";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}
const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const product = initialData.products.find((product) => product.slug === slug);

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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Agregar al carrito</button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
