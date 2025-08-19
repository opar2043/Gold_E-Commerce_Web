
import Banner from './Banner'
import Collection from '../Collection/Collection'
import Policy from '../Policy/Policy'
import BestSellers from './BestSellers'
import About from '../About/About'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Policy></Policy>
        <About></About>
        <Collection></Collection>
        <BestSellers></BestSellers>
    </div>
  )
}

export default Home