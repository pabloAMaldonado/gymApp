/* eslint-disable max-len */

/**
 * @swagger
 * /new-user:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and send a verification email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully, verification email sent
 *       400:
 *         description: Error registering new user
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login a user with username and password, and set a JWT token in an HTTP-only cookie.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=jwtToken; HttpOnly; Secure; SameSite=Strict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the successful login
 *                 user:
 *                   type: string
 *                   description: The username of the authenticated user
 *       401:
 *         description: Unauthorized - Incorrect username or password
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out the user
 *     description: Clears the authentication token from the cookies and logs out the user.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized - No valid authentication token provided
 */

/**
 * @swagger
 * /verify/:verificationId:
 *   put:
 *     summary: Verify a user account
 *     description: Validates a user's verification ID and updates their account as verified.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: verificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique verification ID sent to the user
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User verified successfully."
 *                 user:
 *                   type: object
 *                   description: The updated user object
 *       404:
 *         description: User not found or already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found or already verified."
 *       500:
 *         description: Server error while verifying the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error verifying user."
 *                 error:
 *                   type: string
 *                   description: The error message from the server
 */

/**
 * @swagger
 * /user/add-data:
 *   put:
 *     summary: Add or update user information
 *     description: Add or update user information like weight, height, and years
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formData:
 *                 type: object
 *                 properties:
 *                   weight:
 *                     type: number
 *                   height:
 *                     type: number
 *                   years:
 *                     type: number
 *     responses:
 *       200:
 *         description: User information created successfully / User information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the operation
 *                 userUpdate:
 *                   type: object
 *                   description: The updated user object
 *       400:
 *         description: Error updating user information.
 */

/**
 * @swagger
 * /user/profile-pic:
 *   put:
 *     summary: Add or update user profile image
 *     description: Add or update user profile image
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile image updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the operation
 *       400:
 *         description: Error updating user profile image.
 */

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Obtiene la información del usuario autenticado.
 *     description: Obtiene la información del usuario autenticado, incluyendo sus rutinas creadas.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data delivered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 user:
 *                   type: object
 *                   description: Información del usuario.
 *                 userRoutines:
 *                  type: object
 *                  description: Informacion de las rutinas del usuario.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: no USER found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
