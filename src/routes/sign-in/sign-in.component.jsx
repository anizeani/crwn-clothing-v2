import { signInWithGooglePopup, signInWithFacebookPopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }
    const logfbUser = async () => {
        const {user} = await signInWithFacebookPopup();
        createUserDocumentFromAuth(user);
    }
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={logfbUser}>
                Sign in with Facebook Popup
            </button>
        </div>
    )
}

export default SignIn;