import React, { useState, useEffect } from 'react';
import axios from 'axios';

type UserResponse = { name: string; age: number; address: string };

const User: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  async function fetchUserData(userID: string) {
    const response = await axios.get<UserResponse>(`/${userID}`);
    const { data } = response;
    setUser(data);
  }

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  if (!user) {
    return <>loading...</>;
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
};

export default User;
