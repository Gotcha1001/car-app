/** @type {import("drizzle-kit").Config} */

export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_hzDZkKc2fvl4@ep-white-dew-a8z2h4o0-pooler.eastus2.azure.neon.tech/car-marketplace?sslmode=require&channel_binding=require",
  },
};
