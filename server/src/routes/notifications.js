import { Router } from 'express';
import { Notification } from '../models/Notification.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', async (req, res) => {
  const filter = {
    $or: [
      { audience: 'all' },
      { audience: req.userRole },
      { recipientId: req.userId },
    ],
  };
  const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json(
    notifications.map((n) => ({
      ...n.toObject(),
      read: n.readBy.some((id) => String(id) === String(req.userId)),
    }))
  );
});

router.post('/', authorize('admin', 'teacher'), async (req, res) => {
  const notification = await Notification.create({
    ...req.body,
    createdBy: req.userId,
  });
  res.status(201).json(notification);
});

router.patch('/:id/read', async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) return res.status(404).json({ message: 'Not found' });
  if (!notification.readBy.includes(req.userId)) {
    notification.readBy.push(req.userId);
    await notification.save();
  }
  res.json(notification);
});

export default router;
