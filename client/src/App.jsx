import Carousel from './components/Carousel';
import NavBar from './components/NavBar';
import ShopLatest from './components/ShopLatest';

function App() {
    return (
        <div className="App p-4 md:w-[90%] md:mx-auto">
            <NavBar />
            <Carousel />
            <ShopLatest />
        </div>
    );
}

export default App;
