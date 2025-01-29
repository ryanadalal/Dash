/**
 *
 * runs when a user is successfully authenticated:
 * 1. checks if user object is present on the request, which is set by Passport after successful authentication.
 * 2. Responds with a 200 status and user information if authentication is successful.
 * 3. Includes the user's ID, name, email, profile picture, and role in the response.
 *
 * @param {Object} req - The request object, containing authenticated user data.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 * @returns {Object} JSON object with user data on success, or an error status if authentication fails.
 */
export const protectedAuthCallBackSuccess = (req, res, next) => {
  return res.status(200).json({
    success: true,
    status: 200,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.emails,
      profilePicture: req.user.photos,
    },
  });
};
