export interface FacebookPost {
  full_picture: string;
  name: string;
  created_time: string;
  permalink_url: string;
  type: string;
  icon: string;
  multi_share_end_card: boolean;
  link: string;
  place?: {
    name: string;
    location: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
      state: string;
      zip: string;
    };
    id: string;
  };
  is_hidden: boolean;
  is_expired: boolean;
  actions: Array<{
    name: string;
    link: string;
  }>;
  id: string;
  message?: string; // Optional since it's not present in the first object
}



export interface Tile extends FacebookPost {
  cols: number;
  rows: number;
}


export interface TileLayout {
  rows: number;
  cols: number;
}


export interface FacebookGraphResponse{
  data:FacebookPost[];
  paging:{
    next: string,
    previous: string,
  }
}


function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFacebookPostData(id:any): FacebookPost {
  ;//generateRandomString(10); // Generates a random 10-character string for the id
  return {
    full_picture: `https://upload.wikimedia.org/wikipedia/commons/4/40/Image_test.png`,
    name: `Sample Post ${id}`,
    created_time: new Date().toISOString(),
    permalink_url: `https://example.com/post/${id}`,
    type: 'photo',
    icon: `https://example.com/icon${id}.png`,
    multi_share_end_card: Math.random() < 0.5, // Randomly true or false
    link: `https://example.com/link/${id}`,
    place: {
      name: `Example Place ${id}`,
      location: {
        city: `City ${id}`,
        country: `Country ${id}`,
        latitude: generateRandomNumber(-90, 90),
        longitude: generateRandomNumber(-180, 180),
        state: `State ${id}`,
        zip: `${generateRandomNumber(10000, 99999)}`,
      },
      id: `place${id}`,
    },
    is_hidden: Math.random() < 0.5, // Randomly true or false
    is_expired: Math.random() < 0.5, // Randomly true or false
    actions: [{
      name: 'View',
      link: `https://example.com/view/${id}`,
    }],
    id,
    message: `This is a sample message for the post with id ${id}`,
  };
}

export function generateMultipleFacebookPosts(count: number): FacebookPost[] {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push(generateFacebookPostData(i));
  }
  return posts;
}
