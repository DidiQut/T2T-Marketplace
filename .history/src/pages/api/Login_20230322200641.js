// import connection from '../../lib/db';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(200).json({ message: 'Login successful' });
}

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     const values = [email, password];

//     try {
//       const results = await new Promise((resolve, reject) => {
//         // connection.query(sql, values, (error, results) => {
//         prisma.user.query(sql, values, (error, results) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(results);
//           }
//         });
//       });

//       if (results.length === 0) {
//         res.status(401).json({ message: 'Invalid email or password' });
//       } else {
//         res.status(200).json({ message: 'Login successful' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }