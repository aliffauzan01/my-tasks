import 'dotenv/config';
import { db } from './index.js';
import bcrypt from 'bcryptjs';
import { todos, users } from './schema.js';
 
async function seed() {
  console.log('Seeding database...');
 
  // Hapus data lama (opsional)
  await db.delete(todos);
  await db.delete(users);
 
  // Buat user dummy dengan password yang sudah di-hash
 const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash password
 
  // Buat user dummy
  const user1 = await db
    .insert(users)
    .values({
      username: 'andi',
      // Di aplikasi nyata, password ini harus di-hash!
      // Tapi untuk seed, kita bisa gunakan teks biasa.
      password: hashedPassword, // Simpan password yang sudah di-hash
    })
    .returning();
 
  // Buat todo dummy untuk user1
  await db.insert(todos).values([
    { note: 'Belajar Drizzle ORM', userId: user1[0].id },
    { note: 'Membuat API dengan Hono', userId: user1[0].id },
  ]);
 
  console.log(' Seeding completed!');
  process.exit(0);
}
 
seed().catch((err) => {
  console.error(' Seeding failed:', err);
  process.exit(1);
});
 