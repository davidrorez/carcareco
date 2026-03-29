ALTER TABLE domain.work DROP CONSTRAINT IF EXISTS work_clientid_fkey;

DROP INDEX IF EXISTS domain.idx_work_clientid;
DROP INDEX IF EXISTS domain.idx_work_vehicleid;

ALTER TABLE domain.work DROP COLUMN IF EXISTS clientid;
ALTER TABLE domain.work DROP COLUMN IF EXISTS vehicleid;

ALTER TABLE domain.work ADD COLUMN clientname text;
ALTER TABLE domain.work ADD COLUMN vehicleinfo text;