import { navCategories } from "@/consts/navbarRoutes";
import { notFound } from "next/navigation";


interface CategoryPageProps {
  params: Promise<{ id: string }>
}


const CategoryPage = async ({ params }: CategoryPageProps) => {

  const { id } = await params;
  const category = navCategories.find(cat => cat.value.toLowerCase() === id.toLowerCase());
  if (!category) {
    return notFound()
  }
  return (
    <div>CartPage {id}</div>
  )
}

export default CategoryPage;