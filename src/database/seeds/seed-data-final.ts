import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export async function seedData(dataSource: DataSource) {
  // 0. USER ADMIN
  console.log('Seeding admin user...');
  const passwordHash = await bcrypt.hash('admin123', 10);

  await dataSource.query(`
    INSERT INTO "user" (id, email, password, provider, "firstName", "lastName", "roleId", "statusId", "createdAt", "updatedAt")
    VALUES 
    (1, 'admin@example.com', '${passwordHash}', 'email', 'Admin', 'User', 1, 1, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET 
      email = EXCLUDED.email,
      password = EXCLUDED.password,
      "firstName" = EXCLUDED."firstName",
      "lastName" = EXCLUDED."lastName",
      "roleId" = EXCLUDED."roleId",
      "statusId" = EXCLUDED."statusId",
      "updatedAt" = NOW();
  `);

  // 1. PRODUCTS (jumlah, judul, deskripsi)
  console.log('Seeding products...');
  await dataSource.query(`
    INSERT INTO products (id, jumlah, judul, deskripsi)
    VALUES 
    ('650e8400-e29b-41d4-a716-446655440001', 150, 'Enterprise Web Portal', 'Solusi portal web enterprise yang powerful dan scalable untuk mengelola operasional bisnis Anda. Dilengkapi dengan dashboard analytics, user management, role-based access control, API integration, real-time notifications, dan tampilan mobile responsive yang modern.'),
    ('650e8400-e29b-41d4-a716-446655440002', 120, 'E-Commerce Platform', 'Platform e-commerce lengkap dengan fitur product catalog, shopping cart, payment gateway integration, order management, inventory system, dan customer reviews. Mendukung multi-vendor dan multi-currency untuk ekspansi bisnis yang lebih luas.'),
    ('650e8400-e29b-41d4-a716-446655440003', 80, 'Learning Management System', 'Platform pembelajaran online yang interaktif dengan fitur video streaming, quiz & assignments, progress tracking, discussion forum, certificate generation, dan mobile app. Cocok untuk institusi pendidikan dan corporate training dengan dashboard yang komprehensif.'),
    ('650e8400-e29b-41d4-a716-446655440004', 20, 'Hospital Management System', 'Sistem informasi rumah sakit terintegrasi yang mencakup patient registration, electronic medical records, appointment scheduling, billing system, pharmacy management, dan lab integration. Membantu efisiensi operasional rumah sakit dengan digitalisasi penuh.'),
    ('650e8400-e29b-41d4-a716-446655440005', 65, 'HR Management System', 'Solusi HRIS lengkap untuk mengelola employee database, payroll management, attendance tracking, performance review, recruitment, dan leave management dalam satu platform terintegrasi yang mudah digunakan oleh tim HR.'),
    ('650e8400-e29b-41d4-a716-446655440006', 45, 'Restaurant POS System', 'Sistem Point of Sale khusus untuk restoran dengan fitur order management, kitchen display system, table management, payment integration, menu management, dan sales report real-time. Meningkatkan efisiensi operasional restoran hingga 40%.'),
    ('650e8400-e29b-41d4-a716-446655440007', 55, 'Inventory Management System', 'Sistem manajemen inventori yang efisien untuk tracking stock, purchase orders, warehouse management, barcode scanning, stock alerts, dan multi-location support dengan real-time updates untuk mengoptimalkan supply chain bisnis Anda.'),
    ('650e8400-e29b-41d4-a716-446655440008', 70, 'Customer Relationship Management', 'CRM platform untuk mengelola contact management, sales pipeline, marketing automation, customer support, analytics dashboard, dan email integration. Meningkatkan customer satisfaction dan sales conversion rate hingga 35%.'),
    ('650e8400-e29b-41d4-a716-446655440009', 90, 'Project Management System', 'Platform manajemen proyek dengan fitur task management, gantt charts, time tracking, resource planning, team collaboration, dan comprehensive reporting untuk memastikan proyek selesai tepat waktu dan sesuai budget.'),
    ('650e8400-e29b-41d4-a716-446655440010', 10, 'Mobile App Development', 'Layanan pengembangan aplikasi mobile native (iOS & Android) atau cross-platform dengan modern design, optimal performance, UI/UX design, API integration, push notifications, dan app store deployment assistance.')
    ON CONFLICT (id) DO UPDATE SET jumlah = EXCLUDED.jumlah, judul = EXCLUDED.judul, deskripsi = EXCLUDED.deskripsi;
  `);

  // 2. ORGANIZATION MEMBERS (image, title, description)
  console.log('Seeding organization members...');
  await dataSource.query(`
    INSERT INTO organization_members (id, image, title, description)
    VALUES 
    ('750e8400-e29b-41d4-a716-446655440001', '/themes/default/img/gelap.png', 'Budi Santoso - CEO & Founder', 'Visioner dengan 15 tahun pengalaman di industri teknologi. Memimpin tim untuk menciptakan solusi inovatif.'),
    ('750e8400-e29b-41d4-a716-446655440002', '/themes/default/img/gelap.png', 'Siti Nurhaliza - CTO', 'Ahli arsitektur sistem dengan spesialisasi cloud computing dan microservices. 12 tahun pengalaman.'),
    ('750e8400-e29b-41d4-a716-446655440003', '/themes/default/img/gelap.png', 'Ahmad Wijaya - COO', 'Mengoptimalkan operasional perusahaan dengan efisiensi tinggi. Background MBA dan 10 tahun di tech industry.'),
    ('750e8400-e29b-41d4-a716-446655440004', '/themes/default/img/gelap.png', 'Rina Kusuma - Lead Backend Developer', 'Expert dalam NestJS, PostgreSQL, dan microservices architecture. Memimpin tim backend development.'),
    ('750e8400-e29b-41d4-a716-446655440005', '/themes/default/img/gelap.png', 'Dedy Prasetyo - Lead Frontend Developer', 'Spesialis React, Vue.js, dan modern web technologies. Passionate tentang user experience dan performance.'),
    ('750e8400-e29b-41d4-a716-446655440006', '/themes/default/img/gelap.png', 'Wulandari - Mobile Development Lead', 'Expert dalam React Native dan Flutter. Telah mengembangkan 20+ aplikasi mobile yang sukses.'),
    ('750e8400-e29b-41d4-a716-446655440007', '/themes/default/img/gelap.png', 'Rizky Firmansyah - DevOps Engineer', 'Spesialis CI/CD, Docker, Kubernetes, dan cloud infrastructure (AWS, Azure, GCP).'),
    ('750e8400-e29b-41d4-a716-446655440008', '/themes/default/img/gelap.png', 'Maya Anggraini - UI/UX Designer', 'Design thinking enthusiast dengan portfolio 50+ projects. Fokus pada user-centered design.'),
    ('750e8400-e29b-41d4-a716-446655440009', '/themes/default/img/gelap.png', 'Andi Hermawan - QA Engineer', 'Quality assurance expert dengan pengalaman automation testing dan performance testing.'),
    ('750e8400-e29b-41d4-a716-446655440010', '/themes/default/img/gelap.png', 'Putri Rahayu - Product Manager', 'Agile product management specialist. Memastikan produk sesuai kebutuhan market dan user.'),
    ('750e8400-e29b-41d4-a716-446655440011', '/themes/default/img/gelap.png', 'Farhan Maulana - Data Analyst', 'Data-driven decision maker dengan expertise di business intelligence dan data visualization.'),
    ('750e8400-e29b-41d4-a716-446655440012', '/themes/default/img/gelap.png', 'Linda Sari - Security Engineer', 'Cybersecurity expert yang memastikan aplikasi kami aman dari berbagai ancaman digital.'),
    ('750e8400-e29b-41d4-a716-446655440013', '/themes/default/img/gelap.png', 'Bambang Suprapto - Backend Developer', 'Passionate developer dengan keahlian di Node.js, Python, dan database optimization.'),
    ('750e8400-e29b-41d4-a716-446655440014', '/themes/default/img/gelap.png', 'Nadia Safitri - Frontend Developer', 'Creative frontend developer yang selalu update dengan latest web technologies dan trends.'),
    ('750e8400-e29b-41d4-a716-446655440015', '/themes/default/img/gelap.png', 'Hendra Gunawan - Customer Success Manager', 'Memastikan kepuasan klien dengan response time cepat dan solusi yang tepat sasaran.')
    ON CONFLICT (id) DO UPDATE SET image = EXCLUDED.image, title = EXCLUDED.title, description = EXCLUDED.description;
  `);

  // 3. FEATURES (title, description)
  console.log('Seeding features...');
  await dataSource.query(`
    INSERT INTO features (id, title, description)
    VALUES 
    ('850e8400-e29b-41d4-a716-446655440001', 'Modern Technology Stack', 'Menggunakan teknologi terkini seperti NestJS, React, Vue.js, TypeScript, dan PostgreSQL untuk membangun aplikasi yang powerful, maintainable, dan scalable dengan best practices industry.'),
    ('850e8400-e29b-41d4-a716-446655440002', 'Cloud-Native Architecture', 'Aplikasi dirancang dengan arsitektur cloud-native yang dapat di-deploy di AWS, Azure, atau Google Cloud Platform dengan auto-scaling dan high availability untuk performa optimal.'),
    ('850e8400-e29b-41d4-a716-446655440003', 'Enterprise-Grade Security', 'Implementasi security terbaik dengan encryption, authentication, authorization, regular security audits, dan compliance dengan standar internasional seperti ISO 27001 dan GDPR.'),
    ('850e8400-e29b-41d4-a716-446655440004', 'Mobile Responsive Design', 'Semua aplikasi dibuat dengan pendekatan mobile-first design yang memberikan user experience optimal di berbagai devices mulai dari smartphone hingga desktop.'),
    ('850e8400-e29b-41d4-a716-446655440005', '24/7 Support & Maintenance', 'Tim support kami siap membantu Anda kapan saja dengan response time maksimal 2 jam untuk critical issues dan regular maintenance untuk memastikan sistem berjalan lancar.'),
    ('850e8400-e29b-41d4-a716-446655440006', 'Agile Development', 'Menggunakan metodologi Agile/Scrum dengan sprint 2 minggu, daily standup, dan regular demo untuk memastikan transparansi dan delivery yang cepat sesuai kebutuhan bisnis.'),
    ('850e8400-e29b-41d4-a716-446655440007', 'API Integration', 'Kemampuan integrasi dengan berbagai third-party services seperti payment gateways, shipping providers, social media APIs, dan enterprise systems melalui RESTful API atau GraphQL.'),
    ('850e8400-e29b-41d4-a716-446655440008', 'Advanced Analytics', 'Dashboard analytics komprehensif dengan real-time metrics, customizable reports, data visualization, dan business intelligence untuk data-driven decision making.')
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;
  `);

  // 4. PRICINGS (title, price, features)
  console.log('Seeding pricings...');
  await dataSource.query(`
    INSERT INTO pricings (id, title, price, features)
    VALUES 
    ('950e8400-e29b-41d4-a716-446655440001', 'Starter Package', 'Rp 25.000.000', '["Website Company Profile", "Responsive Design", "5 Pages", "Contact Form", "SEO Basic", "1 Bulan Support"]'::json),
    ('950e8400-e29b-41d4-a716-446655440002', 'Professional Package', 'Rp 75.000.000', '["Custom Web Application", "Admin Dashboard", "Database Integration", "RESTful API", "Authentication", "3 Bulan Support", "Hosting Setup"]'::json),
    ('950e8400-e29b-41d4-a716-446655440003', 'Enterprise Package', 'Rp 150.000.000', '["Full-Stack Application", "Microservices Architecture", "Cloud Deployment", "CI/CD Pipeline", "Load Balancing", "Advanced Security", "6 Bulan Support", "Training Team"]'::json),
    ('950e8400-e29b-41d4-a716-446655440004', 'Maintenance Package', 'Rp 5.000.000/bulan', '["Bug Fixes", "Security Updates", "Performance Monitoring", "24/7 Support", "Regular Backups", "Monthly Reports"]'::json)
    ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, price = EXCLUDED.price, features = EXCLUDED.features;
  `);

  console.log('✅ All data seeded successfully!');
}
