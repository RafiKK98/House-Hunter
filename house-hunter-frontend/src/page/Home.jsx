import Banner from "../components/Banner"
import Footer from "../components/Footer"
import HousesTable from "../components/HousesTable"
import Navbar from "../components/Navbar"

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <HousesTable />
            <Footer />
        </>
    )
}

export default Home