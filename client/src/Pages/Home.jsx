import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import NavBar from '../components/NavBar';
import ShopLatest from '../components/ShopLatest';

const Home = () => {
    return (
        <div className="">
            <NavBar />
            <Carousel />
            <ShopLatest />
            <div className="mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
