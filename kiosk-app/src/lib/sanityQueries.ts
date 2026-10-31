// GROQ queries for Sanity CMS Integration

// Products
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && (category->slug.current == $category || category == $category) && visibilityStatus != "hidden" && visibilityStatus != false] | order(_createdAt desc) {
    "id": coalesce(slug.current, _id),
    title,
    origin,
    filterCountry,
    format,
    badgeLabel,
    price,
    unit,
    "imageSrc": coalesce(image.asset->url, mainImage.asset->url, imageSrc),
    isFavorite,
    "availability": availabilityStatus != "unavailable" && availability != false,
    availabilityStatus,
    displayOrder
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && (slug.current == $slug || _id == $slug) && visibilityStatus != "hidden" && visibilityStatus != false][0] {
    "id": slug.current,
    title,
    origin,
    filterCountry,
    format,
    badgeLabel,
    price,
    unit,
    "imageSrc": coalesce(image.asset->url, mainImage.asset->url, imageSrc),
    "gallery": coalesce(gallery[].asset->url, gallery),
    "category": coalesce(category->slug.current, category),
    description,
    rating,
    reviewCount,
    sizes[] {
      id,
      label,
      subLabel,
      price,
      stock,
      availability
    },
    cutOptions[] {
      id,
      label
    },
    serves,
    catchFrom {
      location,
      points
    },
    bestFor[] {
      title,
      description,
      "imageSrc": coalesce(image.asset->url, imageSrc, "/assets/prod_6_tilapia.jpg")
    },
    "specialty": coalesce(specialty, specialties),
    "specialties": coalesce(specialty, specialties),
    famousOn,
    nutritionInfo {
      amount,
      unit,
      protein,
      calories,
      omega3,
      fat
    },
    "goodFor": coalesce(goodFor, suitableUses),
    allergyInfo {
      title,
      desc,
      warning
    },
    howToCook[] {
      title,
      subtitle,
      time,
      "imageSrc": coalesce(image.asset->url, imageSrc, "/assets/prod_8_trout.jpg")
    },
    "availability": availabilityStatus != "unavailable" && availability != false,
    availabilityStatus,
    isFavorite
  }
`;

// Categories & Filter Options
export const CATEGORIES_QUERY = `
  *[_type == "category" && visibility != false] | order(displayOrder asc) {
    "id": slug.current,
    "label": title,
    "countLabel": subtitle,
    iconName,
    "imageSrc": image.asset->url,
    displayOrder
  }
`;

export const FILTER_OPTIONS_QUERY = `
  *[_type == "filterOption" && visibility != false] | order(displayOrder asc) {
    "id": value.current,
    label,
    filterType,
    applicableCategories,
    count,
    flag,
    displayOrder
  }
`;

// Recipes
export const RECIPES_QUERY = `
  *[_type == "recipe" && visibility != false] | order(displayOrder asc) {
    "id": coalesce(slug.current, _id),
    title,
    "slug": slug.current,
    category,
    difficulty,
    videoDuration,
    cookingTime,
    serves,
    subtitle,
    "thumbnail": coalesce(thumbnail.asset->url, imageSrc),
    videoUrl,
    description,
    ingredients[] {
      name,
      qty,
      icon
    },
    "pdfUrl": recipePdf.asset->url,
    displayOrder
  }
`;

// Singletons
export const OUR_STORY_QUERY = `
  *[_type == "ourStory" && _id in ["ourStory", "drafts.ourStory"]][0] {
    heroHeading,
    heroDescription,
    stat1,
    stat2,
    stat3,
    stat4,
    journey1,
    journey2,
    promiseHeading,
    promiseSubtitle,
    promisesList,
    processHeading,
    processStepsList,
    thankYouHeading,
    thankYouText,
    closingQuote,
    visibility
  }
`;

export const ABOUT_US_QUERY = `
  *[_type == "aboutUs" && _id in ["aboutUs", "drafts.aboutUs"]][0] {
    heroSubtitle,
    heroHeading,
    heroDescription,
    teamSignature,
    selectionTagline,
    selectionHeading,
    selectionSubtitle,
    whyChooseHeading,
    highlight1,
    highlight2,
    highlight3,
    highlight4,
    highlights[] {
      title,
      description,
      icon
    },
    visibility
  }
`;

export const BENEFITS_CONTENT_QUERY = `
  *[_type == "benefitsContent" && _id in ["benefitsContent", "drafts.benefitsContent"]][0] {
    pageTitle,
    pageSubtitle,
    whyFreshMatters {
      title,
      description
    },
    fish1, fish2, fish3, fish4, fish5, fish6,
    meat1, meat2, meat3, meat4, meat5, meat6,
    chicken1, chicken2, chicken3, chicken4, chicken5, chicken6,
    egg1, egg2, egg3, egg4, egg5, egg6,
    fishBenefits[] {
      title,
      description,
      icon
    },
    meatBenefits[] {
      title,
      description,
      icon
    },
    chickenBenefits[] {
      title,
      description,
      icon
    },
    eggBenefits[] {
      title,
      description,
      icon
    },
    visibility
  }
`;

export const STORE_CONTACT_QUERY = `
  *[_type == "storeContact" && _id in ["storeContact", "drafts.storeContact"]][0] {
    businessName,
    contactPageHeading,
    contactPageDescription,
    phone,
    phoneNote,
    email,
    emailNote,
    storeAddress,
    headOfficeAddress,
    workingHours,
    mapEmbedUrl
  }
`;

export const HOME_RIBBON_QUERY = `
  *[_type == "homeRibbon" && _id in ["homeRibbon", "drafts.homeRibbon"]][0] {
    announcements[] {
      text,
      icon,
      color
    },
    visibility
  }
`;

export const TOP_RIGHT_ITEM_COUNT_QUERY = `
  *[_type == "topRightItemCount" && _id in ["topRightItemCount", "drafts.topRightItemCount"]][0] {
    fishSubtitle,
    meatSubtitle,
    chickenSubtitle,
    eggsSubtitle
  }
`;

export const HOME_RECIPES_QUERY = `
  *[_type == "homeRecipes" && _id in ["homeRecipes", "drafts.homeRecipes"]][0] {
    sectionTitle,
    sectionSubtitle,
    viewAllUrl,
    "video1": video1-> {
      "id": slug.current,
      title,
      "subtitle": coalesce(difficulty, category),
      "img": coalesce(image.asset->url, imageSrc),
      videoDuration
    },
    "video2": video2-> {
      "id": slug.current,
      title,
      "subtitle": coalesce(difficulty, category),
      "img": coalesce(image.asset->url, imageSrc),
      videoDuration
    },
    "video3": video3-> {
      "id": slug.current,
      title,
      "subtitle": coalesce(difficulty, category),
      "img": coalesce(image.asset->url, imageSrc),
      videoDuration
    },
    "video4": video4-> {
      "id": slug.current,
      title,
      "subtitle": coalesce(difficulty, category),
      "img": coalesce(image.asset->url, imageSrc),
      videoDuration
    },
    "featuredRecipes": featuredRecipes[]-> {
      "id": slug.current,
      title,
      "subtitle": coalesce(difficulty, category),
      "img": coalesce(image.asset->url, imageSrc),
      videoDuration
    }
  }
`;

export const HOME_FOOTER_QUERY = `
  *[_type == "homeFooter" && _id in ["homeFooter", "drafts.homeFooter"]][0] {
    storeAddress,
    phone,
    email,
    aboutUsText,
    ourStoriesText,
    contactUsText
  }
`;

export const HOME_CUSTOMER_SAYS_QUERY = `
  *[_type == "homeCustomerSays" && _id in ["homeCustomerSays", "drafts.homeCustomerSays"]][0] {
    sectionHeading,
    reviews[] {
      customerName,
      rating,
      reviewText,
      tagline
    }
  }
`;

export const HOME_CAROUSEL_QUERY = `
  *[_type == "homeCarousel" && _id in ["homeCarousel", "drafts.homeCarousel"]][0] {
    slides[] {
      title,
      description,
      "image": image.asset->url,
      destinationUrl,
      offerText,
      active
    }
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && visibility != false] | order(displayOrder asc) {
    "id": _id,
    customerName,
    platform,
    rating,
    testimonialText,
    "customerImage": customerImage.asset->url,
    timeAgo,
    likes,
    displayOrder
  }
`;

export const BANNERS_QUERY = `
  *[_type == "banner" && visibility != false] | order(displayOrder asc) {
    "id": _id,
    title,
    subtitle,
    "image": image.asset->url,
    destinationUrl,
    bannerType,
    offerText,
    displayOrder
  }
`;
