import { Title } from "@/components";
import { ProductsGrid } from "@/components";
import { initialData } from "@/seed";


const products = initialData.products;

export default function Home() {
  return (
    <div>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductsGrid products={products} />
    </div>
  );
}
