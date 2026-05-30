import { Notification } from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      createdBy: req.userId,
    });
    res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Not found' });
    if (!notification.readBy.includes(req.userId)) {
      notification.readBy.push(req.userId);
      await notification.save();
    }
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
