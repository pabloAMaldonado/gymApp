/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email address
 *           example: example@example.com
 *         password:
 *           type: string
 *           description: The user's password
 *           example: Password123!
 *         username:
 *           type: string
 *           description: The user's username
 *           example: user123
 *         profileImg:
 *           type: object
 *           properties:
 *             fieldname:
 *               type: string
 *             originalname:
 *               type: string
 *             encoding:
 *               type: string
 *             mimetype:
 *               type: string
 *             destination:
 *               type: string
 *             filename:
 *               type: string
 *             path:
 *               type: string
 *             size:
 *               type: number
 *           description: The user's profile image
 *           example:
 *             fieldname: profileImg
 *             originalname: profile.jpg
 *             encoding: 7bit
 *             mimetype: image/jpeg
 *             destination: uploads/
 *             filename: profile_1234.jpg
 *             path: uploads/profile_1234.jpg
 *             size: 12345
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               years:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *           description: Array of user's data entries
 *         routines:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               own:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                   description: ID of the user's own routine
 *               public:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                   description: ID of the public routine
 *           description: Array of user's routines
 *         verified:
 *           type: boolean
 *           description: Indicates if the user is verified
 *           default: false
 *         verification:
 *           type: string
 *           description: Verification code for the user
 *         status:
 *           type: string
 *           description: User's status
 *           default: user
 */
const userSchema = {};

/**
 * @swagger
 * components:
 *   schemas:
 *     Routine:
 *       type: object
 *       properties:
 *         distribution:
 *           type: string
 *           description: The distribution of the routine (e.g., full body, split)
 *           example: full body
 *         description:
 *           type: string
 *           description: The description of the routine
 *           example: This is a beginner full body routine
 *         privacy:
 *           type: string
 *           description: The privacy setting of the routine (e.g., public, private)
 *           example: public
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the routine
 *           format: uuid
 *           example: 6049bb5513ecb20015f69e7a
 *         days:
 *           type: object
 *           properties:
 *             monday:
 *               type: object
 *               properties:
 *                 exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       exercise:
 *                         type: string
 *                         format: uuid
 *                         description: The ID of the exercise
 *                       sets:
 *                         type: number
 *                         description: Number of sets for the exercise
 *                       reps:
 *                         type: number
 *                         description: Number of reps for the exercise
 *             tuesday:
 *               type: object
 *               properties: (similar to monday)
 *             wednesday:
 *               type: object
 *               properties: (similar to monday)
 *             thursday:
 *               type: object
 *               properties: (similar to monday)
 *             friday:
 *               type: object
 *               properties: (similar to monday)
 *             saturday:
 *               type: object
 *               properties: (similar to monday)
 *             sunday:
 *               type: object
 *               properties: (similar to monday)
 *           description: Object representing each day of the week with its exercises
 */
const routineSchema = {};

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the exercise
 *           example: Squats
 *         type:
 *           type: string
 *           description: The type of exercise (e.g., strength, cardio)
 *           example: strength
 *         muscle:
 *           type: string
 *           description: The primary muscle targeted by the exercise
 *           example: quadriceps
 *         example:
 *           type: string
 *           description: An example of how to perform the exercise
 *           example: "Stand with your feet shoulder-width apart..."
 *       required:
 *         - name
 *         - type
 *         - muscle
 *         - example
 */
const excersiceSchema = {};

/**
 * @swagger
 * components:
 *   schemas:
 *     PendingExercise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the pending exercise
 *           example: Bench Press
 *         type:
 *           type: string
 *           description: The type of pending exercise (e.g., strength, cardio)
 *           example: strength
 *         muscle:
 *           type: string
 *           description: The primary muscle targeted by the pending exercise
 *           example: chest
 *         example:
 *           type: string
 *           description: An example of how to perform the pending exercise
 *           example: "Lie flat on a bench..."
 *       required:
 *         - name
 *         - type
 *         - muscle
 *         - example
 */
const pendingExcersiceSchema = {};

module.exports = {
  userSchema,
  routineSchema,
  excersiceSchema,
  pendingExcersiceSchema
};
