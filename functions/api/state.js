export async function onRequest(context) {
  const { request, env } = context;
  if (!env.DB) return Response.json({ error: "D1 binding DB is not configured." }, { status: 500 });

  if (request.method === "GET") {
    const row = await env.DB.prepare("SELECT state_json FROM app_state WHERE id = ?").bind("primary").first();
    let state = { days: {} };
    if (row?.state_json) {
      try { state = JSON.parse(row.state_json); } catch {}
    }
    return Response.json({ state }, { headers: { "Cache-Control": "no-store" } });
  }

  if (request.method === "PUT") {
    let payload;
    try { payload = await request.json(); }
    catch { return Response.json({ error: "Invalid JSON." }, { status: 400 }); }

    if (!payload || typeof payload.state !== "object")
      return Response.json({ error: "state is required." }, { status: 400 });

    const stateJson = JSON.stringify(payload.state);
    await env.DB.prepare(`
      INSERT INTO app_state (id, state_json, updated_at)
      VALUES (?, ?, datetime('now'))
      ON CONFLICT(id) DO UPDATE SET
        state_json = excluded.state_json,
        updated_at = excluded.updated_at
    `).bind("primary", stateJson).run();

    return Response.json({ ok: true });
  }

  return new Response("Method Not Allowed", { status: 405 });
}