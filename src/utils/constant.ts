export type SOCKET_RESPONSE_PARAMS = {
  CREATE_EVENT: {
    title: string;
    description: string;
    isAnonymous: boolean;
    user: {
      name: string;
    };
    location: {
      latitude: number;
      longitude: number;
      address: string | null;
      addressOfplace: string | null;
    };
  };
};

export enum SOCKET_RESPONSE_TYPE {
  'CREATE_EVENT' = 'create_event',
}
