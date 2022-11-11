const ASSETS_DIR = '/assets/products';
const ProductItem = () => {
    return (
        <div className="">
            <button>
                <img
                    src={`${ASSETS_DIR}/productImg_1_1.png`}
                    alt=""
                    className="max-w-[162px] rounded md:min-w-[380px]"
                />
            </button>
            <h3>Lira Earrings</h3>
            <p className="text-Bs text-[14px] text-main">$ 20,00</p>
        </div>
    );
};

export default ProductItem;
