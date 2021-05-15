export const ApplicationRoutes = {
  ROOT: '/',
  POKEDEX: '/pokedex',
  ITEMS: '/items',
  CITIES: '/cities',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: {
    ROOT: '/admin',
    ITEMS: {
      LIST: '/admin/items',
      CREATE: '/admin/items/create',
      EDIT: '/admin/items/edit',
    },
    CITIES: {
      LIST: '/admin/cities',
      CREATE: '/admin/cities/create',
      EDIT: '/admin/cities/edit',
    },
    POKEMONS: {
      LIST: '/admin/pokemons',
      CREATE: '/admin/pokemons/create',
      EDIT: '/admin/pokemons/edit',
    },
  },
};
