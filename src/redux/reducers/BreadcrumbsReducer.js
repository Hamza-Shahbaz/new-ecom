import {
  CATEGORY_BREADCRUMB,
  SUB_CATEGORY_BREADCRUMB,
  SET_HOME_BREADCRUMB,
  TRUNCATE_BREADCRUMBS,
  PRODUCT_BREADCRUMB,
  RESET_BREADCRUMBS,
} from "../constant/constants";

const initialState = () => ({
  breadcrumbs: [
    {
      name: "HOME",
      path: "/",
    },
  ],
});

export const BreadcrumbReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_HOME_BREADCRUMB:
      return {
        breadcrumbs: [
          {
            name: "HOME",
            path: "/",
          },
        ],
      };

    case CATEGORY_BREADCRUMB:
      return {
        breadcrumbs: action.payload,
      };

    case PRODUCT_BREADCRUMB:
      return {
        breadcrumbs: action.payload,
      };

    case TRUNCATE_BREADCRUMBS:
      return { breadcrumbs: state.breadcrumbs.slice(0, action.payload + 1) };
    case RESET_BREADCRUMBS: {
      return {
        breadcrumbs: [
          {
            name: "HOME",
            path: "/",
          },
        ],
      };
    }
    default:
      return state;
  }
};
