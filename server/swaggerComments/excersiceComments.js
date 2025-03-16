/* eslint-disable max-len */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Fetch all exercises
 *     description: Retrieves a list of all exercises stored in the database.
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: Excercise's data delivered succefully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique ID of the exercise.
 *                       name:
 *                         type: string
 *                         description: Name of the exercise.
 *                       description:
 *                         type: string
 *                         description: Description of the exercise.
 *                       category:
 *                         type: string
 *                         description: Category of the exercise (e.g., strength, cardio).
 *                       equipment:
 *                         type: string
 *                         description: Equipment required for the exercise (if any).
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Error seinding data.
 */

/**
 * @swagger
 * /user/post-excersice:
 *   post:
 *     summary: Creates a new pending exersice. **needs approve to create a showable excersice**
 *     description: Creates a new pending exercise in the data base, needs approval.
 *     tags:
 *       - Exercises
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               excercise:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   muscle:
 *                     type: string
 *                   example:
 *                     type: string
 *                   description:
 *                     type: string
 *             required:
 *               - name
 *               - type
 *               - muscle
 *               - example
 *               - description
 *     responses:
 *       '200':
 *         description: Excersice created, pending approval.
 *       '400':
 *         description: Error creating exercise.
 */

/**
 * @swagger
 * /admin/approve-excersice:
 *   put:
*     summary: Approves a pending exersice.
 *     description: Approves a pending exercise, creting a exercise and deleting the pending one. **User must have admin or mod status**
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               excersiceId:
 *                 type: string
 *             required:
 *               - excersiceId
 *     responses:
 *       '200':
 *         description: Exercise approved succesfully.
 *       '400':
 *         description: Error at approving exercise.
 *       '404':
 *         description: Pending exercise not found.
 *       '500':
 *         description: User must be admin or mod to approve a pending exercise.
 */

/**
 * @swagger
 * /user/post-comment-excersice:
 *   post:
 *     summary: Adds a comment to an excersice.
 *     description: Adds a comment to an specific exersice on the data base.
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
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
 *                   excericeId:
 *                     type: string
 *                   commentInfo:
 *                     type: string
 *             required:
 *               - formData
 *               - excericeId
 *               - commentInfo
 *     responses:
 *       '200':
 *         description: Comment posted succefully.
 *       '400':
 *         description: Error no user found / Error on the data sended.
 *       '500':
 *         description: Error adding the comment.
 */
