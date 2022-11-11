import React from 'react';
import ProductItem from './ProductItem';

const ShopLatest = () => {
    return (
        <div className="mt-6">
            {/* Title */}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-h5 text-[20px]">Shop The Latest</h1>
                <button className="text-h5 text-[18px] text-main">
                    View all
                </button>
            </div>
            {/* Products */}
            <div className="flex flex-wrap justify-around gap-4 ">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    );
};

export default ShopLatest;
