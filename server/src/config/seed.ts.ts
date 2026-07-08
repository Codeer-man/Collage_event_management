import { pool } from "./pool.js";

async function seed() {
  try {
    await pool.query(
      `INSERT INTO USERS (full_name,email,password,role,image_url,public_id,contact_number,is_email_verified,is_approved_student)
        values (
            'Ram Thapa',
            'nepaldai77@gmail.com',
            '$2a$12$TWCur.HBKiMz2/VvSYIk1.35Pngea.086oxQN2PoBzrzvO64Rji.K',
            'administrative',
            'image',
            'image',
            '9834567890',
            true,
            false
            )
        
        `,
    );
    console.log("Successfull");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
