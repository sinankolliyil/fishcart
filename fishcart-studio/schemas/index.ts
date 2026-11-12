import category from './documents/category';
import filterOption from './documents/filterOption';
import product from './documents/product';
import recipe from './documents/recipe';
import story from './documents/story';
import aboutUs from './documents/aboutUs';
import benefitsContent from './documents/benefitsContent';
import storeContact from './documents/storeContact';
import banner from './documents/banner';
import testimonial from './documents/testimonial';
import customerOpinion from './documents/customerOpinion';
import customerReview from './documents/customerReview';
import googleReview from './documents/googleReview';
import homeRibbon from './documents/homeRibbon';
import topRightItemCount from './documents/topRightItemCount';
import homeRecipes from './documents/homeRecipes';
import homeCarousel from './documents/homeCarousel';
import homeCustomerSays from './documents/homeCustomerSays';
import homeFooter from './documents/homeFooter';
import homeSidebar from './documents/homeSidebar';
import homeLogo from './documents/homeLogo';
import orderSettings from './documents/orderSettings';

export const schemaTypes = [
  // Products & Taxonomy
  product,
  category,
  filterOption,

  // Recipes
  recipe,

  // Homepage
  homeCarousel,
  homeRibbon,
  topRightItemCount,
  homeRecipes,
  homeCustomerSays,
  homeFooter,
  homeSidebar,
  homeLogo,
  testimonial,
  customerOpinion,
  customerReview,
  googleReview,

  // Content Pages (Singletons)
  story,
  aboutUs,
  benefitsContent,

  // Store Contact & Orders
  storeContact,
  orderSettings,
];

