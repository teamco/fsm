/**
 * Import firebase
 * @type {{initializeApp}}
 */
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
