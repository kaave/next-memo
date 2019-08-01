import { Router } from 'express';
import * as HttpStatus from 'http-status-codes';

export function register(router: Router) {
  router.delete('/signout', (req, res) => {
    if (!req.session) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'broken session' });
      return;
    }

    if (!req.session.token) {
      res.status(HttpStatus.NO_CONTENT).json({ message: 'already signout' });
      return;
    }

    req.session.token = null;
    res.status(HttpStatus.RESET_CONTENT).json({ message: 'success' });
  });
}
