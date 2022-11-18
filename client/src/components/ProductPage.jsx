import React from 'react';
const ASSETS_DIR = '/assets/products';

const ProductPage = () => {
    return (
        <div className="mt-4">
            {/* Img */}
            <img
                className="w-full rounded-md object-cover object-center max-h-[485px] mb-6"
                src={`${ASSETS_DIR}/productImg_1_1.png`}
                alt=""
            />
            {/* Title Price */}
            <h3 className="text-h3 text-[28px] mb-4">Lira Earrings</h3>
            <p className="text-h5 text-[20px] text-main">$ 20,00</p>

            {/* Add to cart */}
            <button className="w-full white-btn mt-6">ADD TO CART</button>
            <div className="divider"></div>
        </div>
    );
};

export default ProductPage;
