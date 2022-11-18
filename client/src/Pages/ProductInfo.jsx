import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import ProductPage from '../components/ProductPage';

const ProductInfo = () => {
    return (
        <div>
            <NavBar withoutSearch={true} />
            {/* Content */}
            <ProductPage />
            <div className="mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default ProductInfo;
