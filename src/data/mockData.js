// Mock data for jewelry categories and products
import gold from '../assets/gold.jpg';
import gold1 from '../assets/gold1.png';
import gold2 from '../assets/gold2.png';

export const categories = {
  "yellow-gold-jewelry": {
    id: "yellow-gold-jewelry",
    name: "Yellow Gold Jewelry",
    image: gold,
    description: "Elegant yellow gold pieces crafted to perfection",
    subcategories: {
      "rings": {
        id: "rings",
        name: "Rings",
        description: "Beautiful yellow gold rings for every occasion"
      },
      "necklaces": {
        id: "necklaces", 
        name: "Necklaces",
        description: "Stunning yellow gold necklaces and chains"
      },
      "bracelets": {
        id: "bracelets",
        name: "Bracelets", 
        description: "Elegant yellow gold bracelets and bangles"
      },
      "earrings": {
        id: "earrings",
        name: "Earrings",
        description: "Classic yellow gold earrings collection"
      }
    }
  },
  "lab-grown-diamonds": {
    id: "lab-grown-diamonds",
    name: "Lab Grown Diamonds",
    image: gold1,
    description: "Sustainable and ethical lab-grown diamond jewelry",
    subcategories: {
      "engagement-rings": {
        id: "engagement-rings",
        name: "Engagement Rings",
        description: "Perfect lab-grown diamond engagement rings"
      },
      "tennis-bracelets": {
        id: "tennis-bracelets",
        name: "Tennis Bracelets", 
        description: "Sparkling lab-grown diamond tennis bracelets"
      },
      "stud-earrings": {
        id: "stud-earrings",
        name: "Stud Earrings",
        description: "Classic lab-grown diamond stud earrings"
      }
    }
  },
  "bullion-coins": {
    id: "bullion-coins",
    name: "Bullion & Coins",
    image: gold2,
    description: "Investment grade gold bullion and collectible coins",
    subcategories: {
      "gold-bars": {
        id: "gold-bars",
        name: "Gold Bars",
        description: "Pure gold bars for investment"
      },
      "gold-coins": {
        id: "gold-coins", 
        name: "Gold Coins",
        description: "Collectible and investment gold coins"
      },
      "silver-bullion": {
        id: "silver-bullion",
        name: "Silver Bullion",
        description: "Pure silver bars and coins"
      }
    }
  },
  "white-gold-jewelry": {
    id: "white-gold-jewelry",
    name: "White Gold Jewelry",
    image: gold,
    description: "Modern and sophisticated white gold pieces",
    subcategories: {
      "rings": {
        id: "rings",
        name: "Rings",
        description: "Elegant white gold rings"
      },
      "necklaces": {
        id: "necklaces",
        name: "Necklaces", 
        description: "Beautiful white gold necklaces"
      },
      "earrings": {
        id: "earrings",
        name: "Earrings",
        description: "Stunning white gold earrings"
      }
    }
  },
  "diamond-jewelry": {
    id: "diamond-jewelry", 
    name: "Diamond Jewelry",
    image: gold1,
    description: "Exquisite diamond jewelry collection",
    subcategories: {
      "diamond-rings": {
        id: "diamond-rings",
        name: "Diamond Rings",
        description: "Brilliant diamond rings"
      },
      "diamond-necklaces": {
        id: "diamond-necklaces",
        name: "Diamond Necklaces",
        description: "Sparkling diamond necklaces"
      },
      "diamond-bracelets": {
        id: "diamond-bracelets",
        name: "Diamond Bracelets", 
        description: "Elegant diamond bracelets"
      }
    }
  },
  "watches": {
    id: "watches",
    name: "Watches",
    image: gold2,
    description: "Luxury watches and timepieces",
    subcategories: {
      "gold-watches": {
        id: "gold-watches",
        name: "Gold Watches",
        description: "Premium gold watches"
      },
      "diamond-watches": {
        id: "diamond-watches",
        name: "Diamond Watches",
        description: "Luxury diamond-encrusted watches"
      },
      "mens-watches": {
        id: "mens-watches",
        name: "Men's Watches",
        description: "Sophisticated men's timepieces"
      }
    }
  },
  "certified-diamonds": {
    id: "certified-diamonds",
    name: "Certified Diamonds",
    image: gold1,
    description: "GIA certified loose diamonds",
    subcategories: {
      "round-diamonds": {
        id: "round-diamonds",
        name: "Round Diamonds",
        description: "Classic round brilliant cut diamonds"
      },
      "princess-diamonds": {
        id: "princess-diamonds", 
        name: "Princess Diamonds",
        description: "Square princess cut diamonds"
      },
      "emerald-diamonds": {
        id: "emerald-diamonds",
        name: "Emerald Diamonds",
        description: "Elegant emerald cut diamonds"
      }
    }
  }
};

export const products = [
  // Yellow Gold Jewelry - Rings
  {
    id: 1,
    name: "Classic Gold Wedding Band",
    price: 850.00,
    originalPrice: 950.00,
    category: "yellow-gold-jewelry",
    subcategory: "rings",
    images: [gold, gold1, gold2],
    mainImage: gold,
    description: "Elegant 22k yellow gold wedding band with smooth finish",
    details: "This classic wedding band is crafted from 22k yellow gold with a comfortable fit design. Perfect for everyday wear and special occasions.",
    specifications: {
      metal: "22k Yellow Gold",
      weight: "8.5g",
      width: "4mm",
      finish: "High Polish"
    },
    inStock: true,
    discount: 11,
    rating: 4.8,
    reviews: 124,
    sizes: ["6", "7", "8", "9", "10"],
    certification: "Hallmarked"
  },
  {
    id: 2,
    name: "Gold Diamond Engagement Ring",
    price: 2450.00,
    originalPrice: 2850.00,
    category: "yellow-gold-jewelry", 
    subcategory: "rings",
    images: [gold1, gold, gold2],
    mainImage: gold1,
    description: "Stunning 18k yellow gold engagement ring with 1ct diamond",
    details: "A breathtaking engagement ring featuring a brilliant 1-carat diamond set in 18k yellow gold with intricate detailing.",
    specifications: {
      metal: "18k Yellow Gold",
      diamond: "1ct Round Brilliant",
      clarity: "VS1",
      color: "F",
      weight: "6.2g"
    },
    inStock: true,
    discount: 14,
    rating: 4.9,
    reviews: 89,
    sizes: ["5", "6", "7", "8"],
    certification: "GIA Certified"
  },
  {
    id: 3,
    name: "Gold Eternity Band",
    price: 1200.00,
    originalPrice: 1400.00,
    category: "yellow-gold-jewelry",
    subcategory: "rings", 
    images: [gold2, gold1, gold],
    mainImage: gold2,
    description: "Beautiful 14k yellow gold eternity band with diamonds",
    details: "An elegant eternity band featuring small diamonds set all around in 14k yellow gold for continuous sparkle.",
    specifications: {
      metal: "14k Yellow Gold",
      diamonds: "0.75ct Total Weight",
      clarity: "SI1-SI2",
      color: "G-H",
      weight: "4.8g"
    },
    inStock: true,
    discount: 17,
    rating: 4.7,
    reviews: 156,
    sizes: ["5", "6", "7", "8", "9"],
    certification: "Hallmarked"
  },

  // Yellow Gold Jewelry - Necklaces
  {
    id: 4,
    name: "Gold Chain Necklace",
    price: 1850.00,
    originalPrice: 2100.00,
    category: "yellow-gold-jewelry",
    subcategory: "necklaces",
    images: [gold, gold2, gold1],
    mainImage: gold,
    description: "Classic 22k yellow gold chain necklace, 20 inches",
    details: "A timeless gold chain necklace perfect for layering or wearing alone. Crafted from pure 22k yellow gold.",
    specifications: {
      metal: "22k Yellow Gold",
      length: "20 inches",
      width: "3mm",
      weight: "15.2g",
      clasp: "Spring Ring"
    },
    inStock: true,
    discount: 12,
    rating: 4.6,
    reviews: 203,
    sizes: ["18\"", "20\"", "22\"", "24\""],
    certification: "Hallmarked"
  },

  // Lab Grown Diamonds - Engagement Rings
  {
    id: 5,
    name: "Lab Diamond Solitaire Ring",
    price: 1650.00,
    originalPrice: 2200.00,
    category: "lab-grown-diamonds",
    subcategory: "engagement-rings",
    images: [gold1, gold, gold2],
    mainImage: gold1,
    description: "Ethical lab-grown diamond solitaire in 14k white gold",
    details: "A stunning solitaire engagement ring featuring a brilliant lab-grown diamond in a classic 14k white gold setting.",
    specifications: {
      metal: "14k White Gold",
      diamond: "1.2ct Round Brilliant",
      clarity: "VVS2",
      color: "E",
      weight: "5.8g"
    },
    inStock: true,
    discount: 25,
    rating: 4.9,
    reviews: 78,
    sizes: ["5", "6", "7", "8"],
    certification: "IGI Certified Lab Grown"
  },

  // Bullion & Coins
  {
    id: 6,
    name: "1oz Gold Bar",
    price: 2045.00,
    originalPrice: 2045.00,
    category: "bullion-coins",
    subcategory: "gold-bars",
    images: [gold2, gold, gold1],
    mainImage: gold2,
    description: "Pure 24k gold bar, 1 troy ounce investment grade",
    details: "Investment grade 24k pure gold bar. Perfect for investors looking to add physical gold to their portfolio.",
    specifications: {
      purity: "99.99% Pure Gold",
      weight: "1 Troy Ounce (31.1g)",
      dimensions: "50mm x 28mm x 3mm",
      mint: "PAMP Suisse"
    },
    inStock: true,
    discount: 0,
    rating: 5.0,
    reviews: 45,
    sizes: ["1oz"],
    certification: "PAMP Suisse Certified"
  },

  // White Gold Jewelry
  {
    id: 7,
    name: "White Gold Tennis Bracelet",
    price: 3200.00,
    originalPrice: 3800.00,
    category: "white-gold-jewelry",
    subcategory: "bracelets",
    images: [gold, gold1, gold2],
    mainImage: gold,
    description: "Elegant 14k white gold tennis bracelet with diamonds",
    details: "A classic tennis bracelet featuring brilliant diamonds set in 14k white gold for timeless elegance.",
    specifications: {
      metal: "14k White Gold",
      diamonds: "3.0ct Total Weight",
      clarity: "VS1-VS2",
      color: "F-G",
      length: "7 inches"
    },
    inStock: true,
    discount: 16,
    rating: 4.8,
    reviews: 92,
    sizes: ["6.5\"", "7\"", "7.5\"", "8\""],
    certification: "GIA Certified"
  },

  // Diamond Jewelry
  {
    id: 8,
    name: "Diamond Stud Earrings", 
    price: 2850.00,
    originalPrice: 3200.00,
    category: "diamond-jewelry",
    subcategory: "diamond-earrings",
    images: [gold1, gold2, gold],
    mainImage: gold1,
    description: "Classic diamond stud earrings in 18k white gold",
    details: "Timeless diamond stud earrings featuring brilliant round diamonds in secure 18k white gold settings.",
    specifications: {
      metal: "18k White Gold",
      diamonds: "2.0ct Total Weight (1ct each)",
      clarity: "VS2",
      color: "G",
      setting: "4-Prong Martini"
    },
    inStock: true,
    discount: 11,
    rating: 4.9,
    reviews: 167,
    sizes: ["Standard"],
    certification: "GIA Certified"
  },

  // Watches
  {
    id: 9,
    name: "Gold Luxury Watch",
    price: 8500.00,
    originalPrice: 9500.00,
    category: "watches",
    subcategory: "gold-watches",
    images: [gold2, gold, gold1],
    mainImage: gold2,
    description: "Luxury 18k gold automatic watch with leather strap",
    details: "A sophisticated automatic watch crafted from 18k yellow gold with premium leather strap and Swiss movement.",
    specifications: {
      case: "18k Yellow Gold",
      movement: "Swiss Automatic",
      diameter: "42mm",
      waterResistance: "100m",
      strap: "Genuine Leather"
    },
    inStock: true,
    discount: 11,
    rating: 4.7,
    reviews: 34,
    sizes: ["Standard"],
    certification: "Swiss Made"
  },

  // Certified Diamonds
  {
    id: 10,
    name: "2ct Round Diamond",
    price: 12500.00,
    originalPrice: 15000.00,
    category: "certified-diamonds",
    subcategory: "round-diamonds",
    images: [gold1, gold, gold2],
    mainImage: gold1,
    description: "GIA certified 2ct round brilliant diamond, D color, VVS1",
    details: "An exceptional 2-carat round brilliant diamond with D color and VVS1 clarity. Perfect for custom jewelry settings.",
    specifications: {
      carat: "2.00ct",
      cut: "Round Brilliant",
      color: "D (Colorless)",
      clarity: "VVS1",
      polish: "Excellent",
      symmetry: "Excellent"
    },
    inStock: true,
    discount: 17,
    rating: 5.0,
    reviews: 12,
    sizes: ["Loose Stone"],
    certification: "GIA Certified"
  }
];

// Helper functions
export const getCategoriesList = () => Object.values(categories);

export const getProductsByCategory = (categoryId) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsBySubcategory = (categoryId, subcategoryId) => {
  return products.filter(product => 
    product.category === categoryId && product.subcategory === subcategoryId
  );
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = (limit = 6) => {
  return products.slice(0, limit);
};

export const getDiscountedProducts = () => {
  return products.filter(product => product.discount > 0);
};
