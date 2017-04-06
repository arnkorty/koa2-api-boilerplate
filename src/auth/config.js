'use strict';

export const localClient = {
  name: 'local',
  id: 'local',
  secret: 'local',
};

export const facebook = {
  clientId: '',
  clientSecret: '',
  callbackUrl: 'http://localhost:3000/api/auth/facebook/callback',
};

// TODO - add a real secret key
export const auth = {
  secret: 'bbecd3b255ea55c3d1682e171638e963',
};
