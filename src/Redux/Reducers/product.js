const initialState = {
  data: [],
  isLoading: false,
  isFullfilled: false,
  isRejected: false
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFullfilled: false
      }

    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true
      }

    case 'GET_PRODUCT_FULFILLEDJ':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        product: action.payload.data.data
      }

    default:
      return state

  }
}

export default product
