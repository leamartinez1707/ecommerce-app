export const revalidate = 0;

import { getPaginatedProductsWithImages } from '@/actions';
import Link from 'next/link';
import { Title, Pagination } from '@/components';
import Image from 'next/image';
import { currencyFormat } from '@/utils';

interface Props {
  searchParams?: Promise<{ page?: string }>;
}

const ProductsManagementPage = async ({ searchParams }: Props) => {

  const params = await searchParams;

  const page = params?.page ? parseInt(params.page) : 1;
  const { products, totalPage } = await getPaginatedProductsWithImages({ page });
  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className='mb-5'>
        <Link href="/admin/products/new" className=" btn-primary">
          Crear producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Genero
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>

            {products?.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={`/products/${product.ProductImage[0].url}`}
                      alt={product.title}
                      width={100}
                      height={100}
                      className='size-[100px] object-cover rounded hover:scale-105 transition-all'
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/products/${product.slug}`} className="hover:underline text-blue-800">
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm  text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPage} />
      </div>
    </>
  );
}
export default ProductsManagementPage;