const initialState = {
    year: 2018,
    photos: ['hello', 'photos', 'asf'],

}

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_YEAR':
            return { ...state, year: action.payload }

        case 'ADD_PHOTO':
            let newPhotos = state.photos.slice();
            newPhotos.push(action.payload)
            return { ...state, photos: newPhotos }

        default:
            return state
    }
}
