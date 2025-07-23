import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
import { navCategories } from "@/consts/navbarRoutes";
import { notFound } from "next/navigation";
import { Pagination } from "@/components";


interface CategoryPageProps {
  params: { gender: string }
  searchParams?: { page?: string }
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {

  const { gender } = params;
  const page = searchParams?.page;
  const pageNumber = page ? parseInt(page) : 1;


  const foundedGender = navCategories.find(gen => gen.value.toLowerCase() === gender.toLowerCase());
  if (!foundedGender) {
    return notFound()
  }

  const { products, totalPage } = await getPaginatedProductsWithImages({ gender: foundedGender.value, page })
  return (
    <div>
      <Title title={`Todos los productos de ${foundedGender.name}`} subtitle="Productos encontrados" />
      <ProductsGrid products={products.filter((prd) => prd.gender.toLowerCase() === foundedGender.value.toLowerCase())} />
      <Pagination
        totalPages={totalPage}
      />
    </div>
  )
}

export default CategoryPage;