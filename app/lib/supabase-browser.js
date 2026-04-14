'use client';

import { createClient } from '@supabase/supabase-js';

const DB_STORAGE_KEY = 'rotaract3080.mock.db';
const SESSION_STORAGE_KEY = 'rotaract3080.mock.session';

let browserClient;
let mockClient;

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedDatabase() {
  return {
    clubs: [
      {
        id: 'club-1',
        name: 'RAC Chandigarh Midtown',
        zone: '1',
        sponsor: 'Rotary Club Chandigarh Midtown',
        president: 'Aarav Mehta',
        president_email: 'president@midtown3080.org',
      },
      {
        id: 'club-2',
        name: 'RAC Mohali Central',
        zone: '2',
        sponsor: 'Rotary Club Mohali Central',
        president: 'Diya Khanna',
        president_email: 'president@mohali3080.org',
      },
      {
        id: 'club-3',
        name: 'RAC Dehradun Hills',
        zone: '3',
        sponsor: 'Rotary Club Dehradun Hills',
        president: 'Kabir Anand',
        president_email: 'president@dehradun3080.org',
      },
    ],
    members: [
      {
        id: 'member-1',
        club_name: 'RAC Chandigarh Midtown',
        name: 'Aarav Mehta',
        email: 'president@midtown3080.org',
        designation: 'President',
        ri_id: 'RI-3080-1001',
        blood_group: 'B+',
        phone: '+91 9876500001',
        district_id: 'RID3080-2026-1001',
        volunteer_hours: 28,
      },
      {
        id: 'member-2',
        club_name: 'RAC Chandigarh Midtown',
        name: 'Simran Kaur',
        email: 'simran@midtown3080.org',
        designation: 'Secretary',
        ri_id: 'RI-3080-1002',
        blood_group: 'O+',
        phone: '+91 9876500002',
        district_id: 'RID3080-2026-1002',
        volunteer_hours: 16,
      },
      {
        id: 'member-3',
        club_name: 'RAC Mohali Central',
        name: 'Diya Khanna',
        email: 'president@mohali3080.org',
        designation: 'President',
        ri_id: 'RI-3080-2001',
        blood_group: 'A+',
        phone: '+91 9876500003',
        district_id: 'RID3080-2026-2001',
        volunteer_hours: 22,
      },
      {
        id: 'member-4',
        club_name: 'RAC Dehradun Hills',
        name: 'Kabir Anand',
        email: 'president@dehradun3080.org',
        designation: 'President',
        ri_id: 'RI-3080-3001',
        blood_group: 'AB+',
        phone: '+91 9876500004',
        district_id: 'RID3080-2026-3001',
        volunteer_hours: 19,
      },
    ],
    events: [
      {
        id: 'event-1',
        title: 'Annapurna Service Drive',
        description: 'Food distribution and hygiene kits across Chandigarh.',
        date: '2026-05-31',
        location: 'Chandigarh',
        service_avenue: 'Community Service',
        beneficiaries_count: 180,
        proof_link: 'https://example.com/annapurna',
        image_url: '/Front.jpg',
        club_name: 'RAC Chandigarh Midtown',
        is_approved: true,
        created_at: '2026-04-01T10:00:00.000Z',
      },
      {
        id: 'event-2',
        title: 'Leadership Lab',
        description: 'District-wide leadership and public image workshop.',
        date: '2026-06-14',
        location: 'Mohali',
        service_avenue: 'Youth Leadership',
        beneficiaries_count: 95,
        proof_link: 'https://example.com/leadership-lab',
        image_url: '/Front.jpg',
        club_name: 'RID 3080 OFFICIAL',
        is_approved: true,
        created_at: '2026-04-03T10:00:00.000Z',
      },
    ],
    notifications: [
      {
        id: 'notification-1',
        target_email: 'president@mohali3080.org',
        message: 'Monthly reporting window is open. Please update your service hours.',
        is_read: false,
        created_at: '2026-04-10T10:00:00.000Z',
      },
    ],
    monthly_reports: [],
    contact_messages: [],
    storage: { events: {} },
    users: {
      'rkakkar2003@gmail.com': { password: 'admin123', role: 'admin' },
      'president@midtown3080.org': { password: 'club123', role: 'president' },
      'president@mohali3080.org': { password: 'club123', role: 'president' },
      'president@dehradun3080.org': { password: 'club123', role: 'president' },
    },
  };
}

function readDb() {
  const existing = window.localStorage.getItem(DB_STORAGE_KEY);
  if (existing) {
    return JSON.parse(existing);
  }

  const seeded = seedDatabase();
  window.localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeDb(db) {
  window.localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
}

function getSession() {
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setSession(email) {
  const session = {
    user: { email },
    access_token: `mock-token-${email}`,
  };
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

function pickColumns(rows, columns) {
  if (!columns || columns === '*') {
    return rows;
  }

  const requestedColumns = columns
    .split(',')
    .map((column) => column.trim())
    .filter(Boolean);

  return rows.map((row) => {
    const nextRow = {};
    for (const column of requestedColumns) {
      nextRow[column] = row[column];
    }
    return nextRow;
  });
}

class MockQueryBuilder {
  constructor(table) {
    this.table = table;
    this.action = 'select';
    this.columns = '*';
    this.selectOptions = {};
    this.filters = [];
    this.orderBy = null;
    this.singleRow = false;
    this.payload = null;
  }

  select(columns = '*', options = {}) {
    this.action = 'select';
    this.columns = columns;
    this.selectOptions = options;
    return this;
  }

  insert(rows) {
    this.action = 'insert';
    this.payload = rows;
    return this;
  }

  update(values) {
    this.action = 'update';
    this.payload = values;
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }

  eq(column, value) {
    this.filters.push({ column, value });
    return this;
  }

  order(column, options = {}) {
    this.orderBy = { column, ascending: options.ascending !== false };
    return this;
  }

  single() {
    this.singleRow = true;
    return this;
  }

  async execute() {
    const db = readDb();
    const rows = [...(db[this.table] || [])];
    let filteredRows = rows.filter((row) =>
      this.filters.every(({ column, value }) => row[column] === value)
    );

    if (this.orderBy) {
      const { column, ascending } = this.orderBy;
      filteredRows.sort((left, right) => {
        if (left[column] === right[column]) return 0;
        if (left[column] == null) return ascending ? 1 : -1;
        if (right[column] == null) return ascending ? -1 : 1;
        return left[column] > right[column]
          ? ascending
            ? 1
            : -1
          : ascending
            ? -1
            : 1;
      });
    }

    if (this.action === 'select') {
      const pickedRows = pickColumns(filteredRows, this.columns);
      const data = this.singleRow ? pickedRows[0] ?? null : pickedRows;
      return {
        data: clone(data),
        error: this.singleRow && !pickedRows.length ? { message: 'No rows found.' } : null,
        count: this.selectOptions.count === 'exact' ? filteredRows.length : null,
      };
    }

    if (this.action === 'insert') {
      const insertRows = (this.payload || []).map((row) => ({
        id: row.id || createId(this.table.slice(0, -1) || this.table),
        created_at: row.created_at || new Date().toISOString(),
        ...row,
      }));

      db[this.table] = [...rows, ...insertRows];

      if (this.table === 'clubs') {
        for (const club of insertRows) {
          if (club.president_email) {
            db.users[club.president_email] = { password: 'club123', role: 'president' };
          }
        }
      }

      writeDb(db);
      return { data: clone(insertRows), error: null };
    }

    if (this.action === 'update') {
      const updatedRows = [];
      db[this.table] = rows.map((row) => {
        const matches = this.filters.every(
          ({ column, value }) => row[column] === value
        );
        if (!matches) {
          return row;
        }
        const updatedRow = { ...row, ...this.payload };
        updatedRows.push(updatedRow);
        return updatedRow;
      });
      writeDb(db);
      return { data: clone(updatedRows), error: null };
    }

    if (this.action === 'delete') {
      const rowsToDelete = filteredRows;
      db[this.table] = rows.filter(
        (row) => !this.filters.every(({ column, value }) => row[column] === value)
      );

      if (this.table === 'clubs') {
        for (const club of rowsToDelete) {
          db.members = db.members.filter((member) => member.club_name !== club.name);
          db.events = db.events.filter((event) => event.club_name !== club.name);
          delete db.users[club.president_email];
        }
      }

      writeDb(db);
      return { data: clone(rowsToDelete), error: null };
    }

    return { data: null, error: { message: 'Unsupported action.' } };
  }

  then(resolve, reject) {
    return this.execute().then(resolve, reject);
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function createMockClient() {
  return {
    auth: {
      async getSession() {
        return { data: { session: getSession() }, error: null };
      },
      async signInWithPassword({ email, password }) {
        const db = readDb();
        const user = db.users[email];

        if (!user || user.password !== password) {
          return {
            data: { session: null },
            error: { message: 'Invalid email or password.' },
          };
        }

        const session = setSession(email);
        return { data: { session, user: session.user }, error: null };
      },
      async resetPasswordForEmail(email) {
        const db = readDb();
        if (!db.users[email]) {
          return { data: null, error: { message: 'Email not found in local backend.' } };
        }
        return { data: { email }, error: null };
      },
      async updateUser({ password }) {
        const session = getSession();
        if (!session?.user?.email) {
          return { data: null, error: { message: 'No active session found.' } };
        }

        const db = readDb();
        if (!db.users[session.user.email]) {
          return { data: null, error: { message: 'User not found.' } };
        }

        db.users[session.user.email].password = password;
        writeDb(db);
        return { data: { user: { email: session.user.email } }, error: null };
      },
      async signOut() {
        clearSession();
        return { error: null };
      },
    },
    from(table) {
      return new MockQueryBuilder(table);
    },
    storage: {
      from(bucket) {
        return {
          async upload(path, file) {
            const db = readDb();
            db.storage[bucket] ||= {};
            db.storage[bucket][path] = await fileToDataUrl(file);
            writeDb(db);
            return { data: { path }, error: null };
          },
          getPublicUrl(path) {
            const db = readDb();
            return {
              data: {
                publicUrl: db.storage?.[bucket]?.[path] || '',
              },
            };
          },
        };
      },
    },
  };
}

export function isUsingMockBackend() {
  return typeof window !== 'undefined' && !hasSupabaseConfig();
}

export function getBackendLabel() {
  return isUsingMockBackend() ? 'Local demo backend' : 'Supabase backend';
}

export function getSupabaseBrowserClient() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (hasSupabaseConfig()) {
    if (!browserClient) {
      browserClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    }

    return browserClient;
  }

  if (!mockClient) {
    mockClient = createMockClient();
  }

  return mockClient;
}
