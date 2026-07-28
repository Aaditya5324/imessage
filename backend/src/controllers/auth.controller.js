export async function checkAuth(req, res) {
  try {
    const user = req.auth.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ message: 'Authenticated', user });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
    }};