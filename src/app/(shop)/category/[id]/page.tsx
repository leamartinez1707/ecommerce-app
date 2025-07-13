import { ProductsGrid, Title } from "@/components";
import { navCategories } from "@/consts/navbarRoutes";
import { Category } from "@/interfaces/product.interfaces";
import { initialData } from "@/seed";
import { notFound } from "next/navigation";


interface CategoryPageProps {
  params: Promise<{ id: Category }>
}

const products = initialData.products;

const CategoryPage = async ({ params }: CategoryPageProps) => {

  const { id } = await params;
  const category = navCategories.find(cat => cat.value.toLowerCase() === id.toLowerCase());
  if (!category) {
    return notFound()
  }
  return (
    <div>
      <Title title={`Todos los productos de ${category.name}`} subtitle="Productos encontrados" />
      <ProductsGrid products={products.filter((prd) => prd.gender.toLowerCase() === category.value.toLowerCase())} />
    </div>
  )
}

export default CategoryPage;