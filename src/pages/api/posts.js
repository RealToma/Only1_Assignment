import { faker } from "@faker-js/faker";

const convertDate = (dateString, timezone) => {
  let dateStr = dateString;
  const date = new Date(dateStr);

  const options = { timeZone: timezone, timeZoneName: "short" };
  const estDateStr = date.toLocaleString("en-US", options);
  return estDateStr;
};

const generateRandomPosts = (count) => {
  let posts = [];
  for (let i = 0; i < count; i++) {
    const post = {
      userId: faker.string.uuid(),
      author: faker.internet.userName(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      createdAt: convertDate(faker.date.past(), "America/New_York"),
    };
    posts.push(post);
  }

  return posts;
};

export default async function handler(req, res) {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const size = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;

  if (page === 0) {
    // Generate new random posts for the first page only
    const posts = generateRandomPosts(size);
    res.status(200).json({
      isLoading: true,
      data: posts,
      nextPage: page + 1,
      hasNextPage: true,
    });
  } else {
    // Return empty data for subsequent pages to simulate a paginated API
    res.status(200).json({
      isLoading: false,
      data: [],
      nextPage: page + 1,
      hasNextPage: true,
    });
  }
}

// import { faker } from "@faker-js/faker";

// const generatePosts = (count) => {
//   const posts = [];
//   for (let i = 0; i < count; i++) {
//     const post = {
//       userId: faker.string.uuid(),
//       author: faker.internet.userName(),
//       title: faker.lorem.sentence(),
//       content: faker.lorem.paragraphs(),
//       createdAt: faker.date.past(),
//     };
//     posts.push(post);
//   }

//   return posts;
// };

// export default function handler(req, res) {
//   const { pageSize, page } = req.query;

//   // Generate random posts based on the requested page and page size
//   const posts = generatePosts(pageSize * page);

//   // Slice the posts based on the requested page size
//   const slicedPosts = posts.slice(pageSize * (page - 1), pageSize * page);

//   res.status(200).json({ posts: slicedPosts });
// }
