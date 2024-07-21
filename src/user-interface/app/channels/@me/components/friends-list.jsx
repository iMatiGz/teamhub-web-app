import { useEffect, useState } from 'react';
import { useFetch } from '../../../../../hooks/useFetch';
import { FriendLabel } from './friend-label';

const API_URL = import.meta.env.VITE_API_URL;

export const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const { data, error, isLoading } = useFetch(`${API_URL}/users/me/friends`, 'GET', true);

  useEffect(() => {
    if (data) {
      const list = data.map(friend => {
        return (
          <FriendLabel
            key={friend.user_id}
            id={friend.user_id}
            name={friend.username}
            avatar={friend.profile_image}
            status={friend.status_name}
            description={friend.status_description}
          />
        );
      });
      setFriends(list);
    }
  }, [data, error, isLoading]);
  return <>{data && friends}</>;
};
