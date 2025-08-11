
import Banner from './Banner'
import Collection from '../Collection/Collection'
import Policy from '../Policy/Policy'
import BestSellers from './BestSellers'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Policy></Policy>
        <Collection></Collection>
        <BestSellers></BestSellers>
    </div>
  )
}

export default Home