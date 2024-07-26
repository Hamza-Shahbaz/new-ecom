import { CATEGORY_BREADCRUMB, PRODUCT_BREADCRUMB } from "../constant/constants";


function findCategoryPathRecursion(categories, categoryId, path=[], num) {
    for (let category of categories) {
        let cat_name = category.category_title
        let cat_id = num ? category.category_id : category.category_slug
        let cat_path = `/category/${category.category_slug}`
        if (cat_id == categoryId) {
            return path.concat({name : cat_name, path : cat_path, id : category.category_id})
        }
        if (category.sub_categories?.length > 0) {
            let newPath = findCategoryPathRecursion(category.sub_categories, categoryId,path.concat({name : cat_name, path : cat_path, id : category.category_id}), num)
            if (newPath.length > 1) {
                return newPath
            }
        }
    }
    return []
}


export const productBreadcrumbsHandler = (categories, product) => {
    let breadcrumbs = [{name : "Home", path : "/"}]
    let paths = findCategoryPathRecursion(categories, product.category_id, [], true)
    if (paths.length > 0) {
        breadcrumbs = breadcrumbs.concat(paths)
    }
    breadcrumbs = breadcrumbs.concat({name : product.product_name, path : `/product/${product.product_slug}`})
    return ({
        type : PRODUCT_BREADCRUMB,
        payload : breadcrumbs
    })
}

export const categoryBreadcrumbHandler= (categories, categoryId) => {
    let breadcrumbs = [{name : "Home", path : "/"}]
    let paths = findCategoryPathRecursion(categories, categoryId)
    if (paths.length > 0) {
        breadcrumbs = breadcrumbs.concat(paths)
    }
    return breadcrumbs
}
