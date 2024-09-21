/**
 * Import firebase
 * @type {{initializeApp}}
 */
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore, doc, collection, query, where, getDocs, orderBy, limit, getDoc } from 'firebase/firestore';

import { getAnalytics } from 'firebase/analytics';

import { firebaseConfig } from './config/firebase.config';

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
export const analytics = getAnalytics(firebaseApp);

const db = getFirestore(firebaseApp);

/**
 * @export
 * @constant
 */
export const firebaseAppAuth = getAuth(firebaseApp);

/**
 * @export
 * @param collectionPath
 * @param document
 * @return {*}
 */
export const getRef = ({ collectionPath, document }) => {
    if (document) {
        return doc(db, collectionPath, document);
    }

    throw new Error('Document must be defined.');
};

/**
 * Read all from collection
 * @export
 * @async
 * @param collectionPath
 */
export const fbReadAll = async ({ collectionPath }) => {
    return getDocs(collection(db, collectionPath)).catch((error) => {
        console.error(`All: ${collectionPath} \n`, error);
        return error;
    });
};

/**
 * @export
 * @async
 * @description Read from collection by reference.
 * @param colRef
 * @return {Promise<unknown>}
 */
export const fbReadByRef = async ({ colRef }) => {
    const snapshot = await getDoc(colRef);
    return snapshot.data();
};

/**
 * Read from collection by condition
 * @async
 * @export
 * @param collectionPath
 * @param field
 * @param [operator]
 * @param [optional]
 * @param value
 */
export const fbReadBy = async ({ field, value, collectionPath, operator = '==', optional = {} }) => {
    const { order, orderDirection = 'desc' } = optional;

    const queryParams = [collection(db, collectionPath), where(field, operator, value)];

    if (order) {
        queryParams.push(orderBy(order, orderDirection));
    }

    if (optional?.limit) {
        queryParams.push(limit(optional.limit));
    }

    const q = query.apply(null, queryParams);

    return getDocs(q).catch((error) => {
        console.error(error.message);
        return error;
    });
};

/**
 * @export
 * @param props
 * @return {Promise<DocumentSnapshot<unknown, DocumentData>>}
 */
export const fbFindById = async (props) => {
    const { docRef, collectionPath, docName } = props;

    const _docRef = docRef ?? getRef({ collectionPath, document: docName });
    return getDoc(_docRef).catch((error) => {
        console.error(error.message);
        return error;
    });
};
