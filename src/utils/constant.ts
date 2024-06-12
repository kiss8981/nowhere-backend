export type SOCKET_RESPONSE_PARAMS = {
  CREATE_EVENT: {
    id: number;
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
    createdAt: Date;
  };
  LAST_EVENTS: SOCKET_RESPONSE_PARAMS['CREATE_EVENT'][];
};

export enum SOCKET_RESPONSE_TYPE {
  'CREATE_EVENT' = 'create_event',
}
