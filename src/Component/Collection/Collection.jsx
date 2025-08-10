import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'

const Collection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Title + Top Arched Images */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          
          {/* Title */}
          <div className="flex-shrink-0">
            <h2 className="text-5xl md:text-6xl font-bold text-amber-900 tracking-wide leading-tight">
              OUR
            </h2>
            <h2 className="text-5xl md:text-6xl font-bold text-amber-900 tracking-wide leading-tight">
              COLLECTION
            </h2>
          </div>

          {/* Top Row - Rounded Top Images */}
          <div className="flex gap-6">
            {/* Top Left Image */}
            <div className="relative">
              <img 
                src={banner1} 
                alt="Collection item 1" 
                className="w-64 h-96 object-cover shadow-lg"
                style={{
                  borderRadius: '100px 100px 0px 0px'
                }}
              />
            </div>
            
            {/* Top Right Image */}
            <div className="relative">
              <img 
                src={banner2} 
                alt="Collection item 2" 
                className="w-64 h-96 object-cover shadow-lg"
                style={{
                  borderRadius: '100px 100px 0px 0px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Row 2: Bottom Arched Images + Description Text */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          
          {/* Bottom Row - Rounded Bottom Images */}
          <div className="flex gap-6">
            {/* Bottom Left Image */}
            <div className="relative">
              <img 
                src={banner3} 
                alt="Collection item 3" 
                className="w-64 h-96 object-cover shadow-lg"
                style={{
                  borderRadius: '0px 0px 100px 100px'
                }}
              />
            </div>
            
            {/* Bottom Right Image */}
            <div className="relative">
              <img 
                src={banner4} 
                alt="Collection item 4" 
                className="w-64 h-96 object-cover shadow-lg"
                style={{
                  borderRadius: '0px 0px 100px 100px'
                }}
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="flex-shrink-0 max-w-sm">
            <p className="text-gray-600 leading-relaxed text-base">
              Lorem ipsum dolor sit amet consectetur. Turpis ac aenean dui facilisis. 
              Praesent arcu enim eget quam. Urna mi enim justo lacinia semper eras. 
              Dui faucibus duis sed cursus sit nulla. Urna mi enim justo lacinia semper eras. 
              Dui faucibus duis sed cursus sit nulla.
            </p>
          </div>
        </div>

        {/* Explore Collection Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-amber-600 hover:border-amber-700">
            <span className="text-lg tracking-wide">Explore Collection</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Collection
