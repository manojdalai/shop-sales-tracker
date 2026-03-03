export const products = [
  // Rice Varieties - Dual pricing (packet & loose)
  { 
    id: 1, 
    name: 'Basmati Rice - Premium', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 2900,
    packetUnit: '25 kg',
    loosePrice: 125,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  { 
    id: 2, 
    name: 'Basmati Rice - Regular', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 1900,
    packetUnit: '25 kg',
    loosePrice: 85,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  { 
    id: 3, 
    name: 'Sona Masoori Rice', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 1400,
    packetUnit: '25 kg',
    loosePrice: 65,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  { 
    id: 4, 
    name: 'Kolam Rice', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 1300,
    packetUnit: '25 kg',
    loosePrice: 60,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  { 
    id: 5, 
    name: 'Brown Rice', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 2100,
    packetUnit: '25 kg',
    loosePrice: 95,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  { 
    id: 6, 
    name: 'Ponni Rice', 
    category: 'rice',
    hasPacketLoose: true,
    packetPrice: 1200,
    packetUnit: '25 kg',
    loosePrice: 55,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },

  // Pulses Varieties
  { id: 7, name: 'Toor Dal (Arhar)', price: 120, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 8, name: 'Moong Dal', price: 110, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 9, name: 'Chana Dal', price: 100, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 10, name: 'Urad Dal', price: 130, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 11, name: 'Masoor Dal', price: 95, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 12, name: 'Kabuli Chana', price: 140, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },
  { id: 13, name: 'Rajma (Kidney Beans)', price: 150, unit: '1 kg', category: 'pulses', image: 'https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=400' },

  // Wheat Varieties - Dual pricing (packet & loose)
  { 
    id: 14, 
    name: 'Whole Wheat Atta', 
    category: 'wheat',
    hasPacketLoose: true,
    packetPrice: 950,
    packetUnit: '25 kg',
    loosePrice: 42,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
  },
  { 
    id: 15, 
    name: 'Sharbati Wheat Atta', 
    category: 'wheat',
    hasPacketLoose: true,
    packetPrice: 1200,
    packetUnit: '25 kg',
    loosePrice: 52,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
  },
  { 
    id: 16, 
    name: 'Lokwan Wheat Atta', 
    category: 'wheat',
    hasPacketLoose: true,
    packetPrice: 1050,
    packetUnit: '25 kg',
    loosePrice: 47,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
  },
  { 
    id: 17, 
    name: 'Multigrain Atta', 
    category: 'wheat',
    hasPacketLoose: true,
    packetPrice: 1450,
    packetUnit: '25 kg',
    loosePrice: 62,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
  },
  { 
    id: 18, 
    name: 'Chakki Fresh Atta', 
    category: 'wheat',
    hasPacketLoose: true,
    packetPrice: 1150,
    packetUnit: '25 kg',
    loosePrice: 50,
    looseUnit: '1 kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
  },

  // Refined Oil Varieties - Dual pricing (packet & loose)
  { 
    id: 19, 
    name: 'Sunflower Oil', 
    category: 'refined-oil',
    hasPacketLoose: true,
    packetPrice: 2650,
    packetUnit: '15 liter',
    loosePrice: 185,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 20, 
    name: 'Soybean Oil', 
    category: 'refined-oil',
    hasPacketLoose: true,
    packetPrice: 2350,
    packetUnit: '15 liter',
    loosePrice: 165,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 21, 
    name: 'Rice Bran Oil', 
    category: 'refined-oil',
    hasPacketLoose: true,
    packetPrice: 2950,
    packetUnit: '15 liter',
    loosePrice: 205,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 22, 
    name: 'Groundnut Oil', 
    category: 'refined-oil',
    hasPacketLoose: true,
    packetPrice: 3250,
    packetUnit: '15 liter',
    loosePrice: 225,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 23, 
    name: 'Palm Oil', 
    category: 'refined-oil',
    hasPacketLoose: true,
    packetPrice: 2050,
    packetUnit: '15 liter',
    loosePrice: 145,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },

  // Mustard Oil Varieties - Dual pricing (packet & loose)
  { 
    id: 24, 
    name: 'Kachi Ghani Mustard Oil', 
    category: 'mustard-oil',
    hasPacketLoose: true,
    packetPrice: 2650,
    packetUnit: '15 liter',
    loosePrice: 185,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 25, 
    name: 'Pure Mustard Oil', 
    category: 'mustard-oil',
    hasPacketLoose: true,
    packetPrice: 2350,
    packetUnit: '15 liter',
    loosePrice: 165,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 26, 
    name: 'Organic Mustard Oil', 
    category: 'mustard-oil',
    hasPacketLoose: true,
    packetPrice: 3250,
    packetUnit: '15 liter',
    loosePrice: 225,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  { 
    id: 27, 
    name: 'Double Filtered Mustard Oil', 
    category: 'mustard-oil',
    hasPacketLoose: true,
    packetPrice: 2800,
    packetUnit: '15 liter',
    loosePrice: 195,
    looseUnit: '1 liter',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
]

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'rice', name: 'Rice' },
  { id: 'pulses', name: 'Pulses' },
  { id: 'wheat', name: 'Wheat' },
  { id: 'refined-oil', name: 'Refined Oil' },
  { id: 'mustard-oil', name: 'Mustard Oil' },
]
