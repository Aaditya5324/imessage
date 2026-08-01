// import {getAuth} from '@clerk/express';
// import User from '../models/user.model.js';

// export async function protectroute(req, res, next) {
//     try {
//         const {userId} = getAuth(req);
//         if (!userId) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         const user = await User.findOne({ clerkId: userId });
//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Error in protectroute middleware:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
import {getAuth} from '@clerk/express';
import User from '../models/user.model.js';

export async function protectroute(req, res, next) {
    try {
        const {userId} = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protectroute middleware:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};