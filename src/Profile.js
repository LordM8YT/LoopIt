import { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', userId)
        .single();
      
      if (error) console.error('Error fetching profile:', error);
      else setProfile(data);
    };

    const fetchFollowers = async () => {
      const { count, error } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId);

      if (error) console.error('Error fetching followers:', error);
      else setFollowers(count);
    };

    fetchProfile();
    fetchFollowers();
  }, [userId]);

  const toggleFollow = async () => {
    if (isFollowing) {
      await supabase.from('followers').delete().match({ follower_id: supabase.auth.user().id, following_id: userId });
      setFollowers(followers - 1);
    } else {
      await supabase.from('followers').insert([{ follower_id: supabase.auth.user().id, following_id: userId }]);
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="p-4 text-center">
      {profile ? (
        <>
          <img src={profile.avatar_url} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
          <h2 className="text-xl font-bold mt-2">{profile.username}</h2>
          <p className="text-gray-500">{followers} følgere</p>
          <button
            onClick={toggleFollow}
            className={`mt-4 px-4 py-2 rounded ${isFollowing ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          >
            {isFollowing ? 'Avfølg' : 'Følg'}
          </button>
        </>
      ) : (
        <p>Laster profil...</p>
      )}
    </div>
  );
};

export default Profile;
