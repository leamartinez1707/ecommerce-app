import { Product } from '@/interfaces/product.interfaces'
import { ProductGridItem } from '@/components'

interface ProductsGridProps {
    products: Product[]
}
export const ProductsGrid = ({ products }: ProductsGridProps) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10'>
            {products.map((product) => (
                <ProductGridItem key={product.slug} product={product} />
            ))}
        </div>
    )
}

export default ProductsGrid