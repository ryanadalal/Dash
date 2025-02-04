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
export const protectedSendUserData = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    status: 200,
    user: req.user,
  });
};

/**
 *
 * runs when a user logins for the first time:
 * 1. update the user information in the database according to the data included in the request
 * 2. on success forward to protectedAuthCallbackSuccess to resend the user data
 * 3. on fail sent status 200 with the error
 *
 * @param {Object} req - The request object, containing authenticated user data.
 * @param {Object} res - The response object used to send back the authentication result.
 * @param {Function} next - The next middleware function in the stack (not used in this function).
 * @returns {Object} JSON object with user data on success, or an error status if authentication fails.
 */
export const protectedCompleteRegister = async (req, res, next) => {
  const { firstName, lastName, birthDate } = req.body;
  try {
    req.user.firstName = firstName;
    req.user.lastName = lastName;
    req.user.birthDate = birthDate;
    req.user.valid = true;
    const result = await req.user.save();
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "could not update user information",
    });
  }
};
