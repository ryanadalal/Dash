/**
 * Type for a user in the system:
 * loading: user currently being loaded into the system?
 * id: the id assigned to users by mongo automatically
 * firstName: given name
 * lastName: family: name
 * email: users email
 * photo: null
 */
export type User = {
  loading: boolean;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
  valid: boolean;
  emailVerified: boolean;
};
