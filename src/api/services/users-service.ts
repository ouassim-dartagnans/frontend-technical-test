import axios from 'axios';

import { config } from '../../utils/config';

import { User } from '../../types';

const apiRoute = `${config.NEXT_PUBLIC_API_BASE_URL}`;

export const fetchUserByUserId = async (userId: User['id']) => {
  const { data } = await axios.get(`${apiRoute}/user/${userId}`);
  return data[0] as User;
};

export const fetchUsers = async () => {
  const { data } = await axios.get(`${apiRoute}/users`);
  return data as User[];
};
