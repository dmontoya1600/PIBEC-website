const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js')
const embeddedRouter = require('./embedded.js')
const evenetsRouter = require('./events.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/images', imagesRouter)

router.use('/embedded', embeddedRouter)

router.use('/events', evenetsRouter)





// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
const { route } = require('./session.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;
