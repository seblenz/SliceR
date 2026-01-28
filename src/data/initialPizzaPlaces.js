// Initial seed data for NYC pizza places with sample reviews
export const pizzaPlaces = [
  {
    place_id: 'joes-pizza',
    name: "Joe's Pizza",
    neighborhood: 'Greenwich Village',
    latitude: 40.7306,
    longitude: -73.9969,
    google_maps_link: 'https://maps.google.com/?q=Joes+Pizza+Greenwich+Village',
    active: true,
    reviews: [
      {
        review_id: 'r1',
        timestamp: '2024-01-15T14:30:00Z',
        nickname: 'PizzaLover123',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 9,
        comment: 'The gold standard of NYC pizza. Crispy, foldable, perfect.',
        photo_url: null,
        comments: [
          { nickname: 'SliceFan', text: 'Totally agree! Best cheese slice in the city.', timestamp: '2024-01-15T16:00:00Z' }
        ]
      },
      {
        review_id: 'r2',
        timestamp: '2024-01-10T12:00:00Z',
        nickname: 'NYCFoodie',
        slice_type: 'Pepperoni',
        pizza_style: 'New York Style',
        rating: 8,
        comment: 'Classic pepperoni with great grease pools. Amazing at 2am.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'di-fara-pizza',
    name: 'Di Fara Pizza',
    neighborhood: 'Midwood, Brooklyn',
    latitude: 40.6250,
    longitude: -73.9615,
    google_maps_link: 'https://maps.google.com/?q=Di+Fara+Pizza+Brooklyn',
    active: true,
    reviews: [
      {
        review_id: 'r3',
        timestamp: '2024-01-12T18:00:00Z',
        nickname: 'BrooklynBite',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 10,
        comment: 'Dom DeMarco is a legend. Worth the wait every single time.',
        photo_url: null,
        comments: [
          { nickname: 'PizzaPilgrim', text: 'Made the trek from Manhattan. Life changing.', timestamp: '2024-01-12T20:00:00Z' }
        ]
      }
    ]
  },
  {
    place_id: 'lucali',
    name: 'Lucali',
    neighborhood: 'Carroll Gardens, Brooklyn',
    latitude: 40.6830,
    longitude: -73.9978,
    google_maps_link: 'https://maps.google.com/?q=Lucali+Brooklyn',
    active: true,
    reviews: [
      {
        review_id: 'r4',
        timestamp: '2024-01-08T19:30:00Z',
        nickname: 'CarrollGardenLocal',
        slice_type: 'Pepperoni',
        pizza_style: 'New York Style',
        rating: 10,
        comment: 'Bring cash and patience. The pizza is otherworldly.',
        photo_url: null,
        comments: []
      },
      {
        review_id: 'r5',
        timestamp: '2024-01-05T20:00:00Z',
        nickname: 'DateNightPizza',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 9,
        comment: 'Perfect date spot. Romantic vibes and incredible pizza.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'prince-street-pizza',
    name: 'Prince Street Pizza',
    neighborhood: 'Nolita',
    latitude: 40.7230,
    longitude: -73.9945,
    google_maps_link: 'https://maps.google.com/?q=Prince+Street+Pizza+Nolita',
    active: true,
    reviews: [
      {
        review_id: 'r6',
        timestamp: '2024-01-14T13:00:00Z',
        nickname: 'SpicySliceSeeker',
        slice_type: 'Pepperoni',
        pizza_style: 'Sicilian',
        rating: 9,
        comment: 'The spicy spring is legendary. Thick, crispy, loaded with pepperoni.',
        photo_url: null,
        comments: [
          { nickname: 'HeatLover', text: 'Those pepperoni cups filled with grease are everything!', timestamp: '2024-01-14T15:30:00Z' }
        ]
      }
    ]
  },
  {
    place_id: 'lindustrie-pizzeria',
    name: "L'industrie Pizzeria",
    neighborhood: 'Williamsburg, Brooklyn',
    latitude: 40.7100,
    longitude: -73.9575,
    google_maps_link: 'https://maps.google.com/?q=Lindustrie+Pizzeria+Williamsburg',
    active: true,
    reviews: [
      {
        review_id: 'r7',
        timestamp: '2024-01-11T17:00:00Z',
        nickname: 'WillyBurgWanderer',
        slice_type: 'Burrata',
        pizza_style: 'New York Style',
        rating: 10,
        comment: 'The burrata slice is a masterpiece. Fresh, creamy, perfect.',
        photo_url: null,
        comments: []
      },
      {
        review_id: 'r8',
        timestamp: '2024-01-09T12:30:00Z',
        nickname: 'LunchbreakLarry',
        slice_type: 'Margherita',
        pizza_style: 'New York Style',
        rating: 8,
        comment: 'Great margherita with quality ingredients. A bit pricey.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'scarrs-pizza',
    name: "Scarr's Pizza",
    neighborhood: 'Lower East Side',
    latitude: 40.7155,
    longitude: -73.9885,
    google_maps_link: 'https://maps.google.com/?q=Scarrs+Pizza+LES',
    active: true,
    reviews: [
      {
        review_id: 'r9',
        timestamp: '2024-01-13T15:00:00Z',
        nickname: 'LESLocal',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 9,
        comment: 'House-milled flour makes all the difference. Crust is incredible.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'corner-slice',
    name: 'Corner Slice',
    neighborhood: 'Williamsburg, Brooklyn',
    latitude: 40.7142,
    longitude: -73.9612,
    google_maps_link: 'https://maps.google.com/?q=Corner+Slice+Williamsburg',
    active: true,
    reviews: [
      {
        review_id: 'r10',
        timestamp: '2024-01-07T14:00:00Z',
        nickname: 'CornerCutter',
        slice_type: 'Vodka',
        pizza_style: 'New York Style',
        rating: 8,
        comment: 'Solid vodka slice. Great for a quick bite in the neighborhood.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'paulie-gees-slice-shop',
    name: "Paulie Gee's Slice Shop",
    neighborhood: 'Greenpoint, Brooklyn',
    latitude: 40.7299,
    longitude: -73.9583,
    google_maps_link: 'https://maps.google.com/?q=Paulie+Gees+Slice+Shop+Greenpoint',
    active: true,
    reviews: [
      {
        review_id: 'r11',
        timestamp: '2024-01-06T18:30:00Z',
        nickname: 'GreenpointGuru',
        slice_type: 'Pepperoni',
        pizza_style: 'New York Style',
        rating: 9,
        comment: 'The hellboy slice with hot honey is a game changer.',
        photo_url: null,
        comments: [
          { nickname: 'HotHoneyFan', text: 'That hot honey drizzle is addictive!', timestamp: '2024-01-06T20:00:00Z' }
        ]
      },
      {
        review_id: 'r12',
        timestamp: '2024-01-04T13:00:00Z',
        nickname: 'VeganSliceSeeker',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 8,
        comment: 'They have vegan options that actually taste great!',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'rubirosa',
    name: 'Rubirosa',
    neighborhood: 'Nolita',
    latitude: 40.7224,
    longitude: -73.9958,
    google_maps_link: 'https://maps.google.com/?q=Rubirosa+Nolita',
    active: true,
    reviews: [
      {
        review_id: 'r13',
        timestamp: '2024-01-03T19:00:00Z',
        nickname: 'ThinCrustTony',
        slice_type: 'Vodka',
        pizza_style: 'New York Style',
        rating: 10,
        comment: 'The vodka pie is paper thin and absolutely perfect. A must-try.',
        photo_url: null,
        comments: []
      }
    ]
  },
  {
    place_id: 'ny-pizza-suprema',
    name: 'NY Pizza Suprema',
    neighborhood: 'Midtown',
    latitude: 40.7505,
    longitude: -73.9934,
    google_maps_link: 'https://maps.google.com/?q=NY+Pizza+Suprema+Midtown',
    active: true,
    reviews: [
      {
        review_id: 'r14',
        timestamp: '2024-01-02T12:00:00Z',
        nickname: 'PennStationRegular',
        slice_type: 'Sicilian',
        pizza_style: 'Sicilian',
        rating: 9,
        comment: 'Best pizza near Penn Station by a mile. Fresh Sicilian is amazing.',
        photo_url: null,
        comments: []
      },
      {
        review_id: 'r15',
        timestamp: '2024-01-01T15:00:00Z',
        nickname: 'MidtownMuncher',
        slice_type: 'Plain Cheese',
        pizza_style: 'New York Style',
        rating: 8,
        comment: 'Reliable slice in the chaos of Midtown. Never disappoints.',
        photo_url: null,
        comments: [
          { nickname: 'CommuterCarl', text: 'My go-to before catching a train!', timestamp: '2024-01-01T17:00:00Z' }
        ]
      }
    ]
  }
];

// Slice type options
export const sliceTypes = [
  'Plain Cheese',
  'Pepperoni',
  'White',
  'Pesto',
  'Vodka',
  'Margherita',
  'Mushroom',
  'Sausage',
  'Veggie',
  'Meat Lovers',
  'Buffalo Chicken',
  'BBQ Chicken',
  'Hawaiian',
  'Burrata',
  'Other'
];

// Pizza style options
export const pizzaStyles = [
  'New York Style',
  'Grandma',
  'Sicilian',
  'Chicago Deep-Dish',
  'Neapolitan',
  'Detroit Style',
  'Bar Pie',
  'Other'
];
