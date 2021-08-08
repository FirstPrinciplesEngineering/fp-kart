import { ADD_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, GET_CATEGORY_DETAILS_FAIL, GET_CATEGORY_DETAILS_REQUEST, GET_CATEGORY_DETAILS_SUCCESS, GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS } from "../constants/categoryConstant";

export const AddCategoryReducer = (state={}, action) => {

    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return{
                loading: true
            }
        case ADD_CATEGORY_SUCCESS:
            return{
                loading:false,
                category_added:action.payload
            }
        case ADD_CATEGORY_FAIL:
            return{
                error:action.payload
            }
    
        default:
            return state
    }
}

export const CategoryReducer = (state={ category:[] }, action) => {

    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return{
                categoryLoading: true
            }
        case GET_CATEGORY_SUCCESS:
            return{
                categoryLoading:false,
                category:action.payload
            }
        case GET_CATEGORY_FAIL:
            return{
                categoryError:action.payload
            }
    
        default:
            return state
    }
}

export const CategoryDetailsReducer = (state={ }, action) => {

    switch (action.type) {
        case GET_CATEGORY_DETAILS_REQUEST:
            return{
                categoryDetailsLoading: true
            }
        case GET_CATEGORY_DETAILS_SUCCESS:
            return{
                categoryDetailsLoading:false,
                categoryDetails:action.payload
            }
        case GET_CATEGORY_DETAILS_FAIL:
            return{
                categoryDetailsError:action.payload
            }
    
        default:
            return state
    }
}
 
export const CategoryUpdateReducer = (state={ }, action) => {

    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
            return{
                categoryUpdateLoading: true
            }
        case UPDATE_CATEGORY_SUCCESS:
            return{
                categoryUpdateLoading:false,
                categoryUpdate:action.payload
            }
        case UPDATE_CATEGORY_FAIL:
            return{
                categoryUpdateError:action.payload
            }
    
        default:
            return state
    }
}
 