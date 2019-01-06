import api from 'src/lib/api'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategoriesAsync () {
  return dispatch =>
    api
      .get(`/categories`)
      .then(response => response.data)
      .then(
        data => dispatch(fetchCategories(data.categories)),
        error => console.error(error)
      )
}

function fetchCategories (data) {
  return {type: FETCH_CATEGORIES, data}
}
