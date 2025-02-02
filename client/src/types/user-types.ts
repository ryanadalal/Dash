/**
 * Type for a user in the system:
 * loading: user currently being loaded into the system?
 * googleId: the id assigned to users by google oauth
 * firstName: given name
 * lastName: family: name
 * email: the first email associated with the google oauth account
 * photo: the first profile photo associated with the google oauth account
 */
export type User = {
  loading: boolean;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
};
