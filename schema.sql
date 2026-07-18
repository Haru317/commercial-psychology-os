CREATE TABLE IF NOT EXISTS app_state (
  id TEXT PRIMARY KEY,
  state_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO app_state (id, state_json)
VALUES ('primary', '{"days":{}}');
