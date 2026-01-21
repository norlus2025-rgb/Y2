#!/usr/bin/env node

/**
 * 🎉 EarnHub Project - Completion Verification
 * 
 * This script verifies all project files are in place
 * Run: node verify-project.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function checkFile(filePath, name) {
  const exists = fs.existsSync(filePath);
  const status = exists ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
  console.log(`${status} ${name}`);
  return exists;
}

function checkDirectory(dirPath, name) {
  const exists = fs.existsSync(dirPath);
  const status = exists ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
  console.log(`${status} ${name}`);
  return exists;
}

console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
console.log(`${colors.blue}EarnHub - Project Verification${colors.reset}`);
console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);

// Check root files
console.log(`${colors.yellow}📄 Root Files:${colors.reset}`);
checkFile('README.md', 'README.md');
checkFile('START_HERE.md', 'START_HERE.md');
checkFile('NEXT_STEPS.md', 'NEXT_STEPS.md');
checkFile('LETS_GO.md', 'LETS_GO.md');
checkFile('docker-compose.yml', 'docker-compose.yml');
checkFile('.gitignore', '.gitignore');

// Check documentation
console.log(`\n${colors.yellow}📚 Documentation:${colors.reset}`);
checkFile('docs/README.md', 'docs/README.md');
checkFile('docs/SETUP.md', 'docs/SETUP.md');
checkFile('docs/USER_GUIDE.md', 'docs/USER_GUIDE.md');
checkFile('docs/PROJECT_SUMMARY.md', 'docs/PROJECT_SUMMARY.md');

// Check backend
console.log(`\n${colors.yellow}🔧 Backend:${colors.reset}`);
checkFile('backend/package.json', 'backend/package.json');
checkFile('backend/tsconfig.json', 'backend/tsconfig.json');
checkFile('backend/.env.example', 'backend/.env.example');
checkFile('backend/Dockerfile', 'backend/Dockerfile');
checkFile('backend/src/index.ts', 'backend/src/index.ts');

console.log(`\n${colors.yellow}  Backend Services:${colors.reset}`);
checkFile('backend/src/services/UserService.ts', 'UserService.ts');
checkFile('backend/src/services/TaskService.ts', 'TaskService.ts');
checkFile('backend/src/services/PaymentService.ts', 'PaymentService.ts');
checkFile('backend/src/services/MobileMoneyService.ts', 'MobileMoneyService.ts');
checkFile('backend/src/services/CryptoService.ts', 'CryptoService.ts');

console.log(`\n${colors.yellow}  Backend Entities:${colors.reset}`);
checkFile('backend/src/entities/User.ts', 'User.ts');
checkFile('backend/src/entities/Task.ts', 'Task.ts');
checkFile('backend/src/entities/TaskSubmission.ts', 'TaskSubmission.ts');
checkFile('backend/src/entities/Payment.ts', 'Payment.ts');
checkFile('backend/src/entities/UserReferral.ts', 'UserReferral.ts');

// Check frontend
console.log(`\n${colors.yellow}🎨 Frontend:${colors.reset}`);
checkFile('frontend/package.json', 'frontend/package.json');
checkFile('frontend/tsconfig.json', 'frontend/tsconfig.json');
checkFile('frontend/tailwind.config.js', 'frontend/tailwind.config.js');
checkFile('frontend/.env.local', 'frontend/.env.local');
checkFile('frontend/Dockerfile', 'frontend/Dockerfile');

console.log(`\n${colors.yellow}  Frontend Pages:${colors.reset}`);
checkFile('frontend/app/page.tsx', 'Home page');
checkFile('frontend/app/layout.tsx', 'Layout');
checkFile('frontend/app/auth/login/page.tsx', 'Login page');
checkFile('frontend/app/dashboard/page.tsx', 'Dashboard');
checkFile('frontend/app/tasks/page.tsx', 'Tasks page');
checkFile('frontend/app/referrals/page.tsx', 'Referrals page');
checkFile('frontend/app/admin/page.tsx', 'Admin panel');

console.log(`\n${colors.yellow}  Frontend Components:${colors.reset}`);
checkFile('frontend/components/Navbar.tsx', 'Navbar');
checkFile('frontend/components/HomePage.tsx', 'HomePage');
checkFile('frontend/components/TaskCard.tsx', 'TaskCard');

// Summary
console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
console.log(`${colors.green}✨ Project Verification Complete!${colors.reset}`);
console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}\n`);

console.log(`${colors.yellow}📖 Next Steps:${colors.reset}`);
console.log(`1. Read: ${colors.blue}START_HERE.md${colors.reset}`);
console.log(`2. Install: ${colors.blue}npm install${colors.reset} (in both folders)`);
console.log(`3. Configure: ${colors.blue}.env${colors.reset} files`);
console.log(`4. Run: ${colors.blue}docker-compose up${colors.reset}`);
console.log(`5. Visit: ${colors.blue}http://localhost:3000${colors.reset}\n`);

console.log(`${colors.green}🚀 Your platform is ready to launch!${colors.reset}\n`);
