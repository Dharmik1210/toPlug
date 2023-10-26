import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //do online status before logout bcoz after that firebase won`t allow it
      // console.log('1');
      const { uid } = user;
      // console.log(uid);
      await projectFirestore
        .collection('users')
        .doc(uid)
        .update({ online: false });
      // console.log('2');
      // sign the user out
      await projectAuth.signOut();
      // console.log('3');
      // dispatch logout action
      dispatch({ type: 'LOGOUT' });
      // console.log('4');
      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
