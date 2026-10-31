import { pool } from "../config/pool.js";
import { AppError } from "../utils/AppError.js";

type notificationType =
  | "team_invitation"
  | "team_invitation_response"
  | "event_update"
  | "event_news";

// create or send notification
export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  entityId?: string;
  entityType?: string;
  type: notificationType;
}) {
  const result = await pool.query(
    `
    INSERT INTO notification 
      (user_id, title, message, entity_id, entity_type,type, read_status)
    VALUES 
      ($1, $2, $3, $4, $5, $6, false)
    `,
    [
      data.userId,
      data.title,
      data.message,
      data.entityId ?? null,
      data.entityType ?? null,
      data.type,
    ],
  );

  return result.rows;
}

// receive all notification
export async function receiveNotification(userId: string) {
  const result = await pool.query(
    `SELECT id,title,message,created_at,read_status FROM notification
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows;
}

//mark  read noti
export async function markAsRead(userId: string, notificationId: number) {
  await pool.query(
    `UPDATE notification
     SET read_status = TRUE
     WHERE user_id = $1 AND id = $2`,
    [userId, notificationId],
  );
}

// read notificatione
export async function readNoti(userId: string, notificationId: number) {
  const notification = await pool.query(
    `
    SELECT * FROM notification 
    WHERE id = $1 
    AND user_id =$2
    `,
    [notificationId, userId],
  );

  if (!notification.rows) {
    throw new AppError(404, "Notification not found");
  }

  await markAsRead(userId, notificationId);

  return notification.rows[0];
}

// delete notfi
export async function deleteNotification(
  userId: string,
  notificationId: number,
) {
  const result = await pool.query(
    `DELETE FROM notification
     WHERE user_id = $1 
       AND id = $2 
       AND read_status = true`, // 👈 Prevents the deletion if is_read is false
    [userId, notificationId],
  );

  if (result.rowCount === 0) {
    throw new Error(
      "Notification cannot be deleted: Either it does not exist, or it is unread.",
    );
  }
}

// delete all notification
export async function deleteAllReadNotifications(userId: string) {
  const result = await pool.query(
    `DELETE FROM notification
     WHERE user_id = $1 
       AND read_status = true`,
    [userId],
  );

  if (result.rowCount === 0) {
    throw new Error(
      "Notification cannot be deleted: Either it does not exist, or it is unread.",
    );
  }
}
