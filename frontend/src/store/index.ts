import { proxy } from 'valtio';

const state = proxy({
  filterSidebar: false,
});

export default state;
