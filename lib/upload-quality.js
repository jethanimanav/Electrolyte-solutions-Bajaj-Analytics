const EMPTY_QUALITY_METRICS = {
  auto_fixed: 0,
  fuzzy_fixed: 0,
  flagged: 0,
}

let ensureUploadHistoryQualityColumnsPromise = null

export async function ensureUploadHistoryQualityColumns(pool) {
  if (!ensureUploadHistoryQualityColumnsPromise) {
    ensureUploadHistoryQualityColumnsPromise = pool.query(`
      ALTER TABLE upload_history ADD COLUMN IF NOT EXISTS auto_fixed INTEGER DEFAULT 0;
      ALTER TABLE upload_history ADD COLUMN IF NOT EXISTS fuzzy_fixed INTEGER DEFAULT 0;
      ALTER TABLE upload_history ADD COLUMN IF NOT EXISTS flagged INTEGER DEFAULT 0;
      ALTER TABLE upload_history ADD COLUMN IF NOT EXISTS scrap_rows INTEGER DEFAULT 0;
    `).catch((error) => {
      ensureUploadHistoryQualityColumnsPromise = null
      throw error
    })
  }

  await ensureUploadHistoryQualityColumnsPromise
}

export const uploadQualitySelect = (alias = 'uh') => `
  COALESCE(${alias}.auto_fixed, 0) AS auto_fixed,
  COALESCE(${alias}.fuzzy_fixed, 0) AS fuzzy_fixed,
  COALESCE(${alias}.flagged, 0) AS flagged
`

export async function queryUploadQualityTotals(pool) {
  await ensureUploadHistoryQualityColumns(pool)

  const result = await pool.query(`
    SELECT
      COALESCE(SUM(auto_fixed), 0) AS auto_fixed,
      COALESCE(SUM(fuzzy_fixed), 0) AS fuzzy_fixed,
      COALESCE(SUM(flagged), 0) AS flagged
    FROM upload_history
    WHERE status = 'success'
  `)

  return result.rows[0] || EMPTY_QUALITY_METRICS
}

export async function queryLatestSuccessfulUpload(pool) {
  await ensureUploadHistoryQualityColumns(pool)

  const result = await pool.query(`
    SELECT
      uh.id,
      uh.original_name,
      uh.total_rows,
      uh.ok_rows,
      uh.nff_rows,
      uh.wip_rows,
      uh.uploaded_at,
      ${uploadQualitySelect('uh')}
    FROM upload_history uh
    WHERE uh.status = 'success'
    ORDER BY uh.uploaded_at DESC
    LIMIT 1
  `)

  return result.rows[0] || null
}

export async function updateUploadQualityMetrics(pool, uploadId, metrics = {}) {
  await ensureUploadHistoryQualityColumns(pool)

  await pool.query(
    `
      UPDATE upload_history
      SET
        auto_fixed = $2,
        fuzzy_fixed = $3,
        flagged = $4
      WHERE id = $1
    `,
    [
      uploadId,
      Number(metrics.autoFixed || 0),
      Number(metrics.fuzzyFixed || 0),
      Number(metrics.flagged || 0),
    ]
  )
}
