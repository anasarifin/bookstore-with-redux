const initialState = {
  categories: [],
  isLoading: false,
  isFullfilled: false,
  isRejected: false
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFullfilled: false
      }

    case 'GET_CATEGORIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }

    case 'GET_CATEGORIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        categories: action.payload.data.data
      }

    default:
      return state

  }
}

export default categories
