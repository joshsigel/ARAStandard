#!/usr/bin/env node
/**
 * Apply ARA Standard v1.1 database schema to Supabase.
 *
 * Usage:
 *   DATABASE_PASSWORD=your_password node scripts/apply-schema.js
 *
 * Or add DATABASE_PASSWORD to .env.local and run:
 *   node scripts/apply-schema.js
 *
 * The database password can be found in the Supabase Dashboard:
 *   Settings → Database → Connection string → Password
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Load .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const PROJECT_REF = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');

if (!DB_PASSWORD) {
  console.error(`
╔══════════════════════════════════════════════════════════════╗
║  DATABASE_PASSWORD is required                               ║
║                                                              ║
║  Find it in the Supabase Dashboard:                          ║
║    Settings → Database → Connection string → Password        ║
║                                                              ║
║  Then run:                                                   ║
║    DATABASE_PASSWORD=your_password node scripts/apply-schema.js  ║
║                                                              ║
║  Or add it to .env.local:                                    ║
║    DATABASE_PASSWORD=your_password                            ║
╚══════════════════════════════════════════════════════════════╝
  `.trim());
  process.exit(1);
}

async function main() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  console.log(`\n🔗 Connecting to Supabase project: ${PROJECT_REF}`);
  console.log(`   Region: us-west-2 (pooler)\n`);

  const client = new Client({
    host: `aws-0-us-west-2.pooler.supabase.com`,
    port: 6543,
    database: 'postgres',
    user: `postgres.${PROJECT_REF}`,
    password: DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let success = 0;
    let skipped = 0;
    let failed = 0;

    for (const stmt of statements) {
      const firstLine = stmt.split('\n').find(l => l.trim() && !l.trim().startsWith('--'));
      const label = (firstLine || stmt).substring(0, 80).trim();

      try {
        await client.query(stmt + ';');
        success++;
        console.log(`  ✅ ${label}...`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          skipped++;
          console.log(`  ⏭️  ${label}... (already exists)`);
        } else {
          failed++;
          console.error(`  ❌ ${label}...`);
          console.error(`     ${err.message}\n`);
        }
      }
    }

    console.log(`\n📊 Summary: ${success} applied, ${skipped} skipped, ${failed} failed`);
    console.log('   Total statements: ' + statements.length);

    if (failed === 0) {
      console.log('\n🎉 Schema applied successfully!\n');
      console.log('Next step: Run the seed script:');
      console.log('  python3 scripts/seed-database.py\n');
    } else {
      console.log('\n⚠️  Some statements failed. Review errors above.\n');
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check DATABASE_PASSWORD is correct');
    console.error('  2. Verify the project is active in the Supabase Dashboard');
    console.error('  3. Try pasting scripts/schema.sql into the Supabase SQL Editor:');
    console.error(`     https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
