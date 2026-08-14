import dns from "node:dns/promises";
import mongoose from "mongoose";
import { config } from "./src/config/env.js";
import Menu from "./src/module/foodraft/models/menu.model.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const seedProducts = [
  // --- PIZZA ---
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella and fresh basil",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "pizza",
    isAvailable: true,
    preparationTime: 20,
  },
  {
    name: "Pepperoni Passion",
    description: "Loaded with spicy pepperoni and extra mozzarella cheese",
    price: 399,
    imageUrl:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "pizza",
    isAvailable: true,
    preparationTime: 22,
  },
  {
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, smoky BBQ sauce, and red onions",
    price: 429,
    imageUrl:
      "https://images.unsplash.com/photo-1734769484424-36b99dd84818?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "pizza",
    isAvailable: true,
    preparationTime: 25,
  },

  // --- BURGERS ---
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar, lettuce, and secret sauce",
    price: 249,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "burger",
    isAvailable: true,
    preparationTime: 15,
  },
  {
    name: "Crispy Chicken Burger",
    description: "Fried chicken breast with spicy mayo and pickles",
    price: 279,
    imageUrl:
      "https://images.unsplash.com/photo-1615297928064-24977384d0da?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "burger",
    isAvailable: true,
    preparationTime: 18,
  },

  // --- PASTA ---
  {
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine tossed in rich parmesan cream sauce",
    price: 349,
    imageUrl:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "pasta",
    isAvailable: true,
    preparationTime: 20,
  },
  {
    name: "Spaghetti Bolognaise",
    description: "Traditional slow-cooked minced beef in tomato sauce",
    price: 379,
    imageUrl:
      "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "pasta",
    isAvailable: false,
    preparationTime: 25,
  },

  // --- TACOS ---
  {
    name: "Spicy Beef Tacos",
    description: "Three soft tortillas with seasoned beef and salsa",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "tacos",
    isAvailable: true,
    preparationTime: 12,
  },
  {
    name: "Grilled Fish Tacos",
    description: "Tacos filled with white fish, cabbage slaw, and lime crema",
    price: 229,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664476631037-87a2714dd04e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "tacos",
    isAvailable: true,
    preparationTime: 15,
  },

  // --- SALADS ---
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, croutons, and creamy Caesar dressing",
    price: 189,
    imageUrl:
      "https://images.unsplash.com/photo-1605291535065-e1d52d2b264a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "salad",
    isAvailable: true,
    preparationTime: 10,
  },
  {
    name: "Greek Feta Salad",
    description: "Cucumbers, tomatoes, olives, and large chunks of feta cheese",
    price: 219,
    imageUrl:
      "https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "salad",
    isAvailable: true,
    preparationTime: 10,
  },

  // --- SUSHI ---
  {
    name: "California Roll",
    description: "8 pieces with crab stick, avocado, and cucumber",
    price: 449,
    imageUrl:
      "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "sushi",
    isAvailable: true,
    preparationTime: 30,
  },
  {
    name: "Salmon Nigiri",
    description: "Fresh slices of raw salmon over pressed sushi rice",
    price: 499,
    imageUrl:
      "https://images.unsplash.com/photo-1617196034738-26c5f7c977ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "sushi",
    isAvailable: true,
    preparationTime: 25,
  },

  // --- SANDWICHES ---
  {
    name: "Club Sandwich",
    description: "Triple-decker bread with chicken, egg, bacon, and lettuce",
    price: 179,
    imageUrl:
      "https://images.unsplash.com/photo-1712746784291-e29d5d2694d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "sandwich",
    isAvailable: true,
    preparationTime: 12,
  },

  // --- DRINKS ---
  {
    name: "Iced Caramel Macchiato",
    description: "Cold espresso drink mixed with rich milk and caramel syrup",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SWNlZCUyMENhcmFtZWwlMjBNYWNjaGlhdG98ZW58MHx8MHx8fDA%3D",
    category: "drink",
    isAvailable: true,
    preparationTime: 5,
  },
  {
    name: "Fresh Mint Mojito",
    description: "Refreshing soda with crushed mint leaves and lime juice",
    price: 119,
    imageUrl:
      "https://images.unsplash.com/photo-1609345265499-2133bbeb6ce5?q=80&w=997&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "drink",
    isAvailable: true,
    preparationTime: 5,
  },
  {
    name: "Mango Smoothie",
    description: "Thick, cold drink blended with fresh sweet mangoes",
    price: 139,
    imageUrl:
      "https://images.unsplash.com/photo-1680588194311-6eb00e9c1e25?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "drink",
    isAvailable: true,
    preparationTime: 7,
  },

  // --- DESSERTS ---
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a soft, gooey liquid center",
    price: 169,
    imageUrl:
      "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dessert",
    isAvailable: true,
    preparationTime: 15,
  },
  {
    name: "New York Cheesecake",
    description:
      "Rich, dense cheesecake slice with a buttery graham cracker crust",
    price: 199,
    imageUrl:
      "https://images.unsplash.com/photo-1708175313856-8573b2bf8a3a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dessert",
    isAvailable: true,
    preparationTime: 10,
  },
  {
    name: "Fudgy Chocolate Brownie",
    description: "Chewy, dense chocolate brownie topped with chocolate chips",
    price: 99,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1716152295675-595f7a5a1d54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dessert",
    isAvailable: true,
    preparationTime: 5,
  },
];

async function seedData() {
  try {
    await mongoose.connect(config.MONGO_URI, { dbName: "FoodRaft" });

    console.log("====== Connected to DB for Seeding =======");

    await Menu.deleteMany({});

    await Menu.insertMany(seedProducts);

    console.log("Data successfully seeded");
  } catch (err) {
    console.log("unable to seed data", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
