import img1 from '../assets/Carousel/carousel_img1.png';

const Carosel = () => {
    return (
        <div className="mt-4 relative">
            <img
                className="w-full rounded-md object-cover object-right-top min-h-[385px] max-h-[40rem]"
                src={img1}
                alt=""
            />
            {/* Content */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end px-3 pb-10 text-white md:px-6 md:justify-center mb:pb-0">
                <h1 className="text-h4 mb-3">Gold big hoops</h1>
                <p className="text-Bs mb-6">
                    $ <span>68,00</span>
                </p>
                <button className="text-Bs border-[1.5px]  border-white rounded-[4px] w-fit py-[10px] px-[10px] tranition duration-200 hover:text-black hover:bg-white md:px-5 md:border-2 md:font-medium">
                    View Product
                </button>
            </div>
        </div>
    );
};

export default Carosel;
