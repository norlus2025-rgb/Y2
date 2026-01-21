import { Router } from 'express';
import passport from 'passport';
import { JwtService, TokenPayload } from '../utils/jwt';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req: any, res) => {
    try {
      const { user, token } = await userService.createOrUpdateUser(req.user);
      res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}&userId=${user.id}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  }
);

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
