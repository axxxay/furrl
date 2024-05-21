import ShareButton from "../ShareButton";
import './style.css'


export default function ProductItem({product, fullWidth}) {
    return (
        <li className={`product-item ${fullWidth ? "product-item-full" : ""}`}>
            <a href={`https://furrl.in/productDetail?id=${product.id}`} className='product-item-content-link'>
                <img src={product.images[0].src} alt='product' className={`product-item-image ${fullWidth ? "product-item-full-image" : ""}`} />
                <div className='product-item-details'>
                    <p className='product-brand-name'>{product.brand[0].name}</p>
                    <p className='product-item-name'>{product.title}</p>
                    <div className='product-item-price-group'>
                        Rs. {product.price.value}
                        <span className='product-item-mrp-price'>Rs. {product.MRP.value}</span>
                        <p className='product-item-discount-percentage'>{product.discountPercent}%</p>
                    </div>
                </div>
            </a>
            <div className='product-item-share-con'>
                <div className='product-item-share'>
                    <ShareButton
                        title={product.title}
                        text={product.title}
                        url={`https://furrl.in/productDetail?id=${product.id}`}
                    />
                </div>
            </div>
        </li>
    )
}