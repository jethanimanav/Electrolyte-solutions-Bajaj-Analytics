import pool from '../../lib/db'
import { ensureUploadHistoryQualityColumns, uploadQualitySelect } from '../../lib/upload-quality'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    await ensureUploadHistoryQualityColumns(pool)

    const result = await pool.query(`
      SELECT
        uh.id, uh.filename, uh.original_name,
        uh.total_rows, uh.ok_rows, uh.nff_rows, uh.wip_rows,
        uh.status, uh.error_message, uh.uploaded_at,
        ${uploadQualitySelect('uh')}
      FROM upload_history uh
      ORDER BY uh.uploaded_at DESC
      LIMIT 20
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
