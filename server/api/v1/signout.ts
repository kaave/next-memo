import { Router } from 'express';

export function register(router: Router) {
  router.delete('/signout', (req, res) => {
    if (!req.session) {
      res.status(500).json({ message: 'broken session' });
      return;
    }

    if (!req.session.token) {
      res.status(204).json({ message: 'already signout' });
      return;
    }

    req.session.token = null;
    res.status(205).json({ message: 'success' });
  });
}
