import 'dotenv/config';
import { DataSource } from 'typeorm';
import { seedData } from './seed-data-final';

async function runSeeder() {
  console.log('🌱 Starting database seeding...');

  // Use DATABASE_URL if available (for Neon/cloud databases)
  const dataSource = process.env.DATABASE_URL
    ? new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
      })
    : new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl:
          process.env.DATABASE_SSL_ENABLED === 'true'
            ? {
                rejectUnauthorized:
                  process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
              }
            : false,
      });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection established');

    await seedData(dataSource);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Data Summary:');
    console.log('  - Products: 10 records');
    console.log('  - Organization Members: 15 records');
    console.log('  - Features: 8 records');
    console.log('  - Pricings: 4 records');
    console.log('  - Total: 37 records\n');
    console.log('  - Features: 8 records');
    console.log('  - Pricing Plans: 4 records');
    console.log('\n✅ You can now access the website at http://localhost:3000');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

void runSeeder();
