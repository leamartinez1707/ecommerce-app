import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductsGrid } from "@/components";

interface Props {
  searchParams?: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { products, totalPage } = await getPaginatedProductsWithImages({ page });

  return (
    <div className="min-h-screen">

      {products.length === 0 ? (
        <Title title="No hay productos" subtitle="No se encontraron productos disponibles" />
      ) : (
        <>
          <Title title="Tienda" subtitle="Todos los productos" />
          <ProductsGrid products={products} />
        </>
      )}
      <Pagination totalPages={totalPage} />
    </div>
  );
}
