import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import ServiceRequest from '../models/ServiceRequest.js';

// This function takes the `io` instance and returns the router
const serviceRoutes = (io) => {
  const router = express.Router();

  // @desc    Create a new service request
  // @route   POST /api/services/request
  // @access  Private/Seeker
  router.post('/request', protect, async (req, res) => {
    if (req.user.role !== 'seeker') {
      return res.status(403).json({ message: 'Only seekers can create requests' });
    }
    const { serviceType } = req.body;
    const request = new ServiceRequest({
      serviceType,
      seeker: req.user._id,
      pincode: req.user.pincode,
    });
    const createdRequest = await request.save();

    // Notify all providers in the same pincode room
    io.to(req.user.pincode).emit('new_service_request', createdRequest);
    
    res.status(201).json(createdRequest);
  });

  // @desc    Get available service requests for a provider
  // @route   GET /api/services/available
  // @access  Private/Provider
  router.get('/available', protect, async (req, res) => {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Only providers can view requests' });
    }
    const requests = await ServiceRequest.find({
      pincode: req.user.pincode,
      status: 'pending',
    }).populate('seeker', 'name email');
    res.json(requests);
  });

    // @desc    Get requests for the logged-in seeker
    // @route   GET /api/services/my-requests
    // @access  Private/Seeker
    router.get('/my-requests', protect, async (req, res) => {
        if (req.user.role !== 'seeker') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const requests = await ServiceRequest.find({ seeker: req.user._id }).sort({ createdAt: -1 });
        res.json(requests);
    });

  // @desc    Accept a service request
  // @route   PUT /api/services/:id/accept
  // @access  Private/Provider
  router.put('/:id/accept', protect, async (req, res) => {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Only providers can accept requests' });
    }
    const request = await ServiceRequest.findById(req.params.id);

    if (request) {
      if (request.status !== 'pending') {
          return res.status(400).json({ message: 'Request is already taken or cancelled' });
      }
      request.provider = req.user._id;
      request.status = 'accepted';
      const updatedRequest = await request.save();
      
      // Notify the specific seeker that their request was accepted
      // A robust implementation would use a dedicated room for each user
      io.emit('request_accepted', updatedRequest);
      
      res.json(updatedRequest);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  });

  return router;
};

export default serviceRoutes;