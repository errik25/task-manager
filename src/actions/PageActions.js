export function setYear(year) {
    return {
        type: 'SET_YEAR',
        payload: year,
    }
}

export function addPhoto(photo) {
    return {
        type: 'ADD_PHOTO',
        payload: photo
    }
}