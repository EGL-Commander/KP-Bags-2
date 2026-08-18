// One-off script: bulk-update Safe Working Load (SWL) to "500 Kg to 2000 Kg"
// on every bag product, except Leno Mesh Bag (which stays 25-50 Kg).
//
// Usage:
//   BACKEND_URL=https://your-app.up.railway.app ADMIN_USER=admin ADMIN_PASS=yourpass node scripts/fix-swl.js
//
// Nothing sensitive is hardcoded here - credentials come from env vars you set
// when you run the command, so they never end up committed to the repo.

const BACKEND_URL = process.env.BACKEND_URL;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

if (!BACKEND_URL || !ADMIN_USER || !ADMIN_PASS) {
  console.error("Missing env vars. Usage:");
  console.error('BACKEND_URL=https://xxx.up.railway.app ADMIN_USER=admin ADMIN_PASS=xxx node scripts/fix-swl.js');
  process.exit(1);
}

const NEW_SWL = "500 Kg to 2000 Kg";
const SKIP_SLUGS = ["leno-mesh-bag"]; // has its own SWL range, don't touch

async function main() {
  // Step 1: log in, get a JWT
  const loginRes = await fetch(`${BACKEND_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS }),
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
  }

  const { token } = await loginRes.json();
  console.log("Logged in, got token.");

  // Step 2: fetch every product currently in the live DB
  const listRes = await fetch(`${BACKEND_URL}/api/admin/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!listRes.ok) {
    throw new Error(`Fetching products failed: ${listRes.status} ${await listRes.text()}`);
  }

  const products = await listRes.json();
  console.log(`Fetched ${products.length} products.`);

  // Step 3: find ones that have an SWL field and need updating
  const targets = products.filter(p => {
    const swl = p.specifications?.["Safe Working Load (SWL)"];
    return swl && swl !== NEW_SWL && !SKIP_SLUGS.includes(p.slug);
  });

  console.log(`${targets.length} product(s) need updating:`);
  targets.forEach(p => console.log(`  - ${p.slug} (currently: ${p.specifications["Safe Working Load (SWL)"]})`));

  // Step 4: PUT each one back with the SWL field patched, everything else untouched
  for (const p of targets) {
    const updatedSpecs = {
      ...p.specifications,
      "Safe Working Load (SWL)": NEW_SWL,
    };

    const putRes = await fetch(`${BACKEND_URL}/api/admin/products/${p.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...p,
        specifications: updatedSpecs,
      }),
    });

    if (!putRes.ok) {
      console.error(`FAILED: ${p.slug} -> ${putRes.status} ${await putRes.text()}`);
    } else {
      console.log(`Updated: ${p.slug}`);
    }
  }

  console.log("Done.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
