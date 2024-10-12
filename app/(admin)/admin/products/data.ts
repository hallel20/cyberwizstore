export const products = [
    {
      id: 1,
      image: "/img/product-1.jpg",
      name: "Canon Camera",
      price: 124,
      stock: 14,
      variants: [
        {
          variantName: "Lens",
          variantOption: "120mm",
          priceModifier: 0, // No price change
          stock: 10,
        },
        {
          variantName: "Lens",
          variantOption: "100mm",
          priceModifier: 10, // +$2 for Large
          stock: 10,
        },
        {
          variantName: "Lens",
          variantOption: "80mm",
          priceModifier: 10,
          stock: 5,
        },
      ],
      orders: 5,
      category: "Photography"
    },
    {
      id: 2,
      image: "/img/product-2.jpg",
      name: "Unisex Top",
      price: 18,
      stock: 56,
      variants: [
        {
          variantName: "Size",
          variantOption: "Medium",
          priceModifier: 0, // No price change
          stock: 50,
        },
        {
          variantName: "Size",
          variantOption: "Large",
          priceModifier: 2, // +$2 for Large
          stock: 50,
        },
        {
          variantName: "Color",
          variantOption: "Red",
          priceModifier: 0,
          stock: 50,
        },
      ],
      orders: 20,
      category: "Fashion"
    },
    {
      id: 3,
      image: "/img/product-3.jpg",
      name: "Room Lamp",
      price: 5,
      stock: 45,
      variants: undefined,
      orders: 27,
      category: "Utilities"
    },
    {
      id: 4,
      image: "/img/product-4.jpg",
      name: "Shoes",
      price: 8,
      stock: 79,
      variants: undefined,
      orders: 18,
      category: "Fashion"
    },
    {
      id: 5,
      image: "/img/product-5.jpg",
      name: "Drone",
      price: 150,
      stock: 10,
      variants: undefined,
      orders: 5,
      category: "Photography"
    },
    {
      id: 6,
      image: "/img/product-6.jpg",
      name: "Apple Watch",
      price: 80,
      stock: 23,
      variants: undefined,
      orders: 5,
      category: "Smartphone Accesories"
    },
  ];