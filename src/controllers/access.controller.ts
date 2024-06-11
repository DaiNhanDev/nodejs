class AccessController {
  signup = async (req, res, next) => {
    try {
      console.log('=====> Body: ', req.body);

      return res.status(201).json({
        code: '201',
        metadata: { user_id: 1 }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AccessController();