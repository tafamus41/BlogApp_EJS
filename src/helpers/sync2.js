"use strict";

const Blog = require("../models/blog");
const Category = require("../models/category");
const User = require("../models/user");

const namesArray = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Katie",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
];
const surnamesArray = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
];

const getRandomDate = () => {
  const today = new Date();
  const randomYear =
    Math.floor(Math.random() * (today.getFullYear() - 2010 + 1)) + 2010;
  const randomMonth =
    randomYear === today.getFullYear()
      ? Math.floor(Math.random() * (today.getMonth() + 1))
      : Math.floor(Math.random() * 12);
  const randomDay =
    randomYear === today.getFullYear() && randomMonth === today.getMonth()
      ? Math.floor(Math.random() * today.getDate()) + 1
      : Math.floor(Math.random() * 28) + 1;

  return new Date(randomYear, randomMonth, randomDay);
};

module.exports = async () => {
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await Category.deleteMany().then(() =>
    console.log(" - Category Deleted All"),
  );
  await Blog.deleteMany().then(() =>
    console.log(" - Blog Deleted All"),
  );

  let users = [];

  for (let i = 1; i <= 500; i++) {
    let newUser = {};
    newUser = {
      username: namesArray[i % 15] + surnamesArray[i % 15] + i.toString(),
      email: namesArray[i % 15] + i.toString() + "@test.com",
      password: "aA*123456",
      firstName: namesArray[i % 15] + i.toString(),
      lastName: surnamesArray[i % 15] + i.toString(),
      isAdmin: false,
      isActive: Boolean(i % 10),
      createdAt: getRandomDate(),
    };

    users.push(newUser);
  }

  await User.create([
    {
      username: "admin",
      email: "admin@test.com",
      password: "aA*123456",
      firstName: "Mustafa",
      lastName: "Seyran",
      isAdmin: true,
      isActive: true,
    },
    ...users,
  ]);
  users = await User.find({});

  const categories = [
    "World",
    "Technology",
    "Design",
    "Culture",
    "Business",
    "Politics",
    "Science",
    "Health",
    "Style",
    "Travel",
  ];

  const images = [
    "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/10/02/15/00/diary-968592_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/11/14/20/18/typewriter-210640_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/02/01/21/16/chalkboard-620316_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/09/14/00/vegetable-juices-1725835_1280.jpg",
    "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg",
  ];

  let n = 0;
  for (let category of categories) {
    const Kategory = await Category.create({
      name: category,
    });

    for (let c = 1; c < 49; c++) {
      
      const newBlog = {
        userId: users.at(n)._id,
        categoryId: Kategory._id,
        title: `Sample ${category} Post -${c}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, voluptate quaerat harum quos quis atque tenetur voluptatem quod exercitationem, neque aliquam libero temporibus sint odio ratione sed, officia dolorum ad.
      Sit ab sint quae facere nam autem modi exercitationem, accusantium alias in inventore optio, ratione impedit earum culpa eveniet perferendis unde. Nihil atque, tempore ullam at soluta rerum natus voluptatibus?`,
        isPublish: Boolean(c % 8),
        createdAt: getRandomDate(),
        image: images.at(c % 7),
      };
      await Blog.create(newBlog);
      n = n + 1;
    }
  }

  console.log("* Synchronized *");
};
