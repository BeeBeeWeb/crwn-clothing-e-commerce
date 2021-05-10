import { takeEvery, call } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
    yield console.log('I am fired');

    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    // collectionRef.get().then(querySnapshot => {
    //     // console.log(querySnapshot, querySnapshot.docs[0].data());
    //     const collectionMap = convertCollectionsSnapshotToMap(querySnapshot);
    //     dispatch(fetchCollectionsSuccess(collectionMap));
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}