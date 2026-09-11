-- Bug réel derrière "je change le logo et ça ne se met jamais à jour" :
-- le chemin de stockage est déterministe (id/logo.<ext>), donc réuploader
-- un logo avec la même extension écrase le même objet à la même URL
-- publique. Supabase Storage sert cet objet avec un Cache-Control par
-- défaut (~1h) : le navigateur (et tout CDN intermédiaire) continue de
-- servir l'ancienne image tant que l'URL ne change pas, même si le fichier
-- côté serveur a bien été remplacé. logo_updated_at sert de cache-buster
-- (?v=timestamp) sur l'URL publique, partout où le logo est affiché.
alter table public.banques add column logo_updated_at timestamptz;
