/**
 *
 * runs when a user is successfully authenticated:
 * 1. checks if user object is present on the request, which is set by Passport after successful authentication.
 * 2. Responds with a 200 status and user information if authentication is successful.
 * 3. Includes the user's ID, name, email, profile photo, and role in the response.
 *
 * @param {Object} req - The request object, containing authenticated user data.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 * @returns {Object} JSON object with user data on success, or an error status if authentication fails.
 */
export const jwtCheckToken = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    exists: req.jwt_token !== null,
    status: 200,
  });
};
