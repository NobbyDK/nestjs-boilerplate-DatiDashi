// Script untuk generate random secrets untuk production
const crypto = require('crypto');

console.log('\n🔐 Generate Random Secrets untuk Production\n');
console.log('Copy secrets di bawah ini ke Vercel Environment Variables:\n');
console.log('='.repeat(60));

const secrets = {
  'AUTH_JWT_SECRET': crypto.randomBytes(32).toString('hex'),
  'AUTH_REFRESH_SECRET': crypto.randomBytes(32).toString('hex'),
  'AUTH_FORGOT_SECRET': crypto.randomBytes(32).toString('hex'),
  'AUTH_CONFIRM_EMAIL_SECRET': crypto.randomBytes(32).toString('hex'),
};

Object.entries(secrets).forEach(([key, value]) => {
  console.log(`\n${key}:`);
  console.log(value);
});

console.log('\n' + '='.repeat(60));
console.log('\n✅ Secrets generated successfully!');
console.log('⚠️  JANGAN commit secrets ini ke Git!');
console.log('📋 Copy & paste ke Vercel Environment Variables\n');
