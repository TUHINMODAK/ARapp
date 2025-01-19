interface FurnitureVariant {
  name: string;
  image: any; // Use a specific type like ImageSourcePropType for React Native images
  color: string;
  price: number;
  dimensions: string; // Furniture dimensions
  roomType: string;   // Suggested room type (e.g., "Living Room")
  furnitureType: string; // Category of furniture (e.g., "Sofa")
}


const sofas = [
  {
    id: 'sofa1',
    name: 'Modern Sofa',
    count: 5,
    image: require('../assets/icons/Msofa.png'),
  },
  {
    id: 'sofa2',
    name: 'Classic Sofa',
    count: 3,
    image: require('../assets/icons/Csofa.png'),
  },
  {
    id: 'sofa3',
    name: 'L-Shaped Sofa',
    count: 4,
    image: require('../assets/icons/Lsofa.png'),
  },
];

const diningTables = [
  {
    id: 'dining1',
    name: 'Wooden Dining Table',
    count: 6,
    image: require('../assets/icons/Wdinning-table.png'),
  },
  {
    id: 'dining2',
    name: 'Glass Dining Table',
    count: 4,
    image: require('../assets/icons/Gdinning-table.png'),
  },
];

const beds = [
  {
    id: 'bed1',
    name: 'Queen Size Bed',
    count: 5,
    image: require('../assets/icons/Qdouble-bed.png'),
  },
  {
    id: 'bed2',
    name: 'King Size Bed',
    count: 2,
    image: require('../assets/icons/Kbed.png'),
  },
];

const closets = [
  {
    id: 'closet1',
    name: 'Sliding Door Closet',
    count: 3,
    image: require('../assets/icons/Scloset.png'),
  },
  {
    id: 'closet2',
    name: 'Classic Wooden Closet',
    count: 4,
    image: require('../assets/icons/wardrobe.png'),
  },
];

const chairs = [
  {
    id: 'chair1',
    name: 'Office Chair',
    count: 7,
    image: require('../assets/icons/Ochair.png'),
  },
  {
    id: 'chair2',
    name: 'Dining Chair',
    count: 8,
    image: require('../assets/icons/Dchair.png'),
  },
];

const officeDesks = [
  {
    id: 'desk1',
    name: 'Wooden Office Desk',
    count: 4,
    image: require('../assets/icons/workspace1.png'),
  },
  {
    id: 'desk2',
    name: 'Modern Office Desk',
    count: 3,
    image: require('../assets/icons/Woffice-desk.png'),
  },
];

const sofaDetails: Record<string, FurnitureVariant[]> = {
  sofa1: [
    {
      name: 'Modern Sofa - Variant 1',
      image: require('../assets/images/brownSofa.jpg'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Modern Sofa - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',

    },
  ],
  sofa2: [
    {
      name: 'Classic Sofa - Variant 1',
      image: require('../assets/images/brownSofa.jpg'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Classic Sofa - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  sofa3: [
    {
      name: 'L-Shaped Sofa - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'L-Shaped Sofa - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  dining1: [
    {
      name: 'Wooden Dining Table - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Wooden Dining Table - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  dining2: [
    {
      name: 'Glass Dining Table - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Glass Dining Table - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  bed1: [
    {
      name: 'Queen Size Bed - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Queen Size Bed - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  bed2: [
    {
      name: 'King Size Bed - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'King Size Bed - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  closet1: [
    {
      name: 'Sliding Door Closet - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Sliding Door Closet - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  closet2: [
    {
      name: 'Classic Wooden Closet - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa'
    },
    {
      name: 'Classic Wooden Closet - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  chair1: [
    {
      name: 'Office Chair - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Office Chair - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  chair2: [
    {
      name: 'Dining Chair - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Dining Chair - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  desk1: [
    {
      name: 'Wooden Office Desk - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Wooden Office Desk - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
  desk2: [
    {
      name: 'Modern Office Desk - Variant 1',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
    {
      name: 'Modern Office Desk - Variant 2',
      image: require('../assets/images/explore_1.png'),
      color: 'Gray',
      price: 899.99,
      dimensions: '84" x 36" x 32"',
      roomType: 'Living Room',
      furnitureType: 'Sofa',
    },
  ],
};

// constants/mocks.tsx or constants/mocks.ts
export type FurnitureModelKey = 
  'Modern Sofa - Variant 1' | 
  'Modern Sofa - Variant 2' | 
  'Classic Sofa - Variant 1' | 
  'Classic Sofa - Variant 2' | 
  'default';

export const furnitureModels: Record<FurnitureModelKey, any> = {
  'Modern Sofa - Variant 1': require("../assets/res/office_sofa_-25mb.glb"),
  'Modern Sofa - Variant 2': require("../assets/res/office_sofa_-25mb.glb"),
  'Classic Sofa - Variant 1': require("../assets/res/c.glb"),
  'Classic Sofa - Variant 2': require("../assets/res/c.glb"),
  'default': require("../assets/res/office_sofa_-25mb.glb")
};


export { sofas, diningTables, beds, closets, chairs, officeDesks, sofaDetails };