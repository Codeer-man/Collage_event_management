export type location = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  is_available?: boolean;
};

export type locationForm = {
  name: string;
  description: string;
  capacity: number;
  is_available: boolean | undefined;
};

export type locationRes = {
  location: location[];
};

export type updateLocationRes = {
  message: string;
  location: locationRes;
};
