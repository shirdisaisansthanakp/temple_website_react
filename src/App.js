import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Donations from "./components/Donations";
import ContactUs from "./components/ContactUs";
import { getPxFromRem } from './helpers/utils';
import 'bootstrap/dist/css/bootstrap.min.css';

const BannerImage = () => (
  <img
    src="assets/images/banner.jpg"
    width={getPxFromRem()}
    height={getPxFromRem(40)}
  />
);

export default function App() {
  return (
    <>  
      <Header />
      <Navbar />
      <BannerImage />
      <Gallery />
      <Donations />
      <ContactUs />
    </>
  )
}
