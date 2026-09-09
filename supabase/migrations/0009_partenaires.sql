-- Assureurs partenaires (accès via le grossiste du courtier), affichés sur
-- la page publique /partenaires et gérés depuis la console admin. Vide au
-- lancement : les noms/logos réels doivent être fournis par le courtier,
-- jamais inventés.
create table public.partenaires (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  logo_path text,
  actif boolean not null default true,
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.partenaires is
  'Assureurs partenaires affichés sur /partenaires. Logo géré via la console admin, stocké dans le bucket logos-partenaires.';

alter table public.partenaires enable row level security;

insert into storage.buckets (id, name, public)
values ('logos-partenaires', 'logos-partenaires', true)
on conflict (id) do nothing;
