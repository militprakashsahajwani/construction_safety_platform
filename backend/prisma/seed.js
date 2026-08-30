import { PrismaClient, Role, IncidentType, ReportStatus, Severity } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash('Safety@123', 12);

async function main() {
  await prisma.notification.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.incidentReport.deleteMany();
  await prisma.checklistTemplate.deleteMany();
  await prisma.user.updateMany({ data: { assignedSiteId: null } });
  await prisma.site.updateMany({ data: { managerId: null } });
  await prisma.user.deleteMany();
  await prisma.site.deleteMany();

  const admin = await prisma.user.create({
    data: { name: 'Priya Nair', email: 'admin@safetyhub.test', passwordHash, role: Role.admin },
  });
  const manager = await prisma.user.create({
    data: { name: 'Arjun Mehta', email: 'manager@safetyhub.test', passwordHash, role: Role.site_manager },
  });
  const site = await prisma.site.create({
    data: { name: 'Skyline Tower Project', location: 'Whitefield, Bengaluru', managerId: manager.id },
  });
  const officer = await prisma.user.create({
    data: { name: 'Ravi Kumar', email: 'officer@safetyhub.test', passwordHash, role: Role.safety_officer, assignedSiteId: site.id },
  });
  const checklist = await prisma.checklistTemplate.create({
    data: { name: 'Daily High-Risk Work Audit', items: ['PPE worn by all personnel', 'Scaffolding boards and guardrails secure', 'Electrical panels secured and labelled', 'Excavation barriers in place', 'Fire extinguishers accessible'] },
  });

  await prisma.incidentReport.createMany({ data: [
    { siteId: site.id, reporterId: officer.id, type: IncidentType.hazard, category: 'Working at height', description: 'Scaffolding collapse risk: loose cross-bracing on east elevation.', severity: Severity.critical, status: ReportStatus.open },
    { siteId: site.id, reporterId: officer.id, type: IncidentType.near_miss, category: 'PPE', description: 'Missing PPE observed during concrete pour; work paused.', severity: Severity.high, status: ReportStatus.resolved },
    { siteId: site.id, reporterId: officer.id, type: IncidentType.hazard, category: 'Electrical', description: 'Exposed wiring adjacent to material storage.', severity: Severity.high, status: ReportStatus.pending },
  ] });
  await prisma.inspection.create({
    data: { siteId: site.id, inspectorId: manager.id, checklistId: checklist.id, results: [
      { item: 'PPE worn by all personnel', pass: true, notes: 'Verified' },
      { item: 'Scaffolding boards and guardrails secure', pass: false, notes: 'Repair order raised' },
      { item: 'Electrical panels secured and labelled', pass: true, notes: 'Verified' },
      { item: 'Excavation barriers in place', pass: true, notes: 'Verified' },
      { item: 'Fire extinguishers accessible', pass: true, notes: 'Verified' },
    ] },
  });
  await prisma.notification.createMany({ data: [
    { userId: manager.id, type: 'critical', message: 'Critical scaffolding collapse risk reported at Skyline Tower Project.' },
    { userId: admin.id, type: 'critical', message: 'Critical safety incident requires administrative oversight.' },
  ] });
  console.log('Seeded successfully. All demo accounts use password: Safety@123');
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
