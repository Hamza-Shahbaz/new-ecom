import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ProductView from './ProductView/ProductView'
import RelatedProducts from './RelatedProducts/RelatedProducts'

const ProductDetails = () => {

  return (
    <>
        <Breadcrumbs/>
        <ProductView/>
        <RelatedProducts />
    </>
  )
}

export default ProductDetails