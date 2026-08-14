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
    imageUrl: "https://unsplash.com",
    category: "pizza",
    isAvailable: true,
    preparationTime: 20,
  },
  {
    name: "Pepperoni Passion",
    description: "Loaded with spicy pepperoni and extra mozzarella cheese",
    price: 399,
    imageUrl: "https://unsplash.com",
    category: "pizza",
    isAvailable: true,
    preparationTime: 22,
  },
  {
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, smoky BBQ sauce, and red onions",
    price: 429,
    imageUrl: "https://unsplash.com",
    category: "pizza",
    isAvailable: true,
    preparationTime: 25,
  },

  // --- BURGERS ---
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar, lettuce, and secret sauce",
    price: 249,
    imageUrl: "https://unsplash.com",
    category: "burger",
    isAvailable: true,
    preparationTime: 15,
  },
  {
    name: "Crispy Chicken Burger",
    description: "Fried chicken breast with spicy mayo and pickles",
    price: 279,
    imageUrl: "https://unsplash.com",
    category: "burger",
    isAvailable: true,
    preparationTime: 18,
  },

  // --- PASTA ---
  {
    name: "Creamy Alfredo Pasta",
    description: "Fettuccine tossed in rich parmesan cream sauce",
    price: 349,
    imageUrl: "https://unsplash.com",
    category: "pasta",
    isAvailable: true,
    preparationTime: 20,
  },
  {
    name: "Spaghetti Bolognaise",
    description: "Traditional slow-cooked minced beef in tomato sauce",
    price: 379,
    imageUrl: "https://unsplash.com",
    category: "pasta",
    isAvailable: false,
    preparationTime: 25,
  },

  // --- TACOS ---
  {
    name: "Spicy Beef Tacos",
    description: "Three soft tortillas with seasoned beef and salsa",
    price: 199,
    imageUrl: "https://unsplash.com",
    category: "tacos",
    isAvailable: true,
    preparationTime: 12,
  },
  {
    name: "Grilled Fish Tacos",
    description: "Tacos filled with white fish, cabbage slaw, and lime crema",
    price: 229,
    imageUrl: "https://unsplash.com",
    category: "tacos",
    isAvailable: true,
    preparationTime: 15,
  },

  // --- SALADS ---
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, croutons, and creamy Caesar dressing",
    price: 189,
    imageUrl: "https://unsplash.com",
    category: "salad",
    isAvailable: true,
    preparationTime: 10,
  },
  {
    name: "Greek Feta Salad",
    description: "Cucumbers, tomatoes, olives, and large chunks of feta cheese",
    price: 219,
    imageUrl: "https://unsplash.com",
    category: "salad",
    isAvailable: true,
    preparationTime: 10,
  },

  // --- SUSHI ---
  {
    name: "California Roll",
    description: "8 pieces with crab stick, avocado, and cucumber",
    price: 449,
    imageUrl: "https://unsplash.com",
    category: "sushi",
    isAvailable: true,
    preparationTime: 30,
  },
  {
    name: "Salmon Nigiri",
    description: "Fresh slices of raw salmon over pressed sushi rice",
    price: 499,
    imageUrl: "https://unsplash.com",
    category: "sushi",
    isAvailable: true,
    preparationTime: 25,
  },

  // --- SANDWICHES ---
  {
    name: "Club Sandwich",
    description: "Triple-decker bread with chicken, egg, bacon, and lettuce",
    price: 179,
    imageUrl: "https://unsplash.com",
    category: "sandwich",
    isAvailable: true,
    preparationTime: 12,
  },

  // --- DRINKS ---
  {
    name: "Iced Caramel Macchiato",
    description: "Cold espresso drink mixed with rich milk and caramel syrup",
    price: 149,
    imageUrl: "https://unsplash.com",
    category: "drink",
    isAvailable: true,
    preparationTime: 5,
  },
  {
    name: "Fresh Mint Mojito",
    description: "Refreshing soda with crushed mint leaves and lime juice",
    price: 119,
    imageUrl: "https://unsplash.com",
    category: "drink",
    isAvailable: true,
    preparationTime: 5,
  },
  {
    name: "Mango Smoothie",
    description: "Thick, cold drink blended with fresh sweet mangoes",
    price: 139,
    imageUrl: "https://unsplash.com",
    category: "drink",
    isAvailable: true,
    preparationTime: 7,
  },

  // --- DESSERTS ---
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a soft, gooey liquid center",
    price: 169,
    imageUrl: "https://unsplash.com",
    category: "dessert",
    isAvailable: true,
    preparationTime: 15,
  },
  {
    name: "New York Cheesecake",
    description:
      "Rich, dense cheesecake slice with a buttery graham cracker crust",
    price: 199,
    imageUrl: "https://unsplash.com",
    category: "dessert",
    isAvailable: true,
    preparationTime: 10,
  },
  {
    name: "Fudgy Chocolate Brownie",
    description: "Chewy, dense chocolate brownie topped with chocolate chips",
    price: 99,
    imageUrl: "https://unsplash.com",
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
