/**
 * AC1 (SPEC v1.1.0): HTML pré-renderizado não contém dados sensíveis de admin.
 * AC4: /admin ausente do sitemap e com noindex no shell.
 * Roda após `nuxt generate`: valida .output/public.
 */
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dirname, "../../.output/public");

describe.skipIf(!existsSync(OUT))("admin embedded — SSG seguro", () => {
  const adminDir = join(OUT, "admin");

  it("gera shell de /admin (client-only), não HTML com dados", () => {
    expect(existsSync(adminDir)).toBe(true);
    const files = readdirSync(join(adminDir, "login"));
    expect(files).toContain("index.html");
    const html = readFileSync(join(adminDir, "login/index.html"), "utf-8");
    // shell vazio: sem dados de tenant/token no pré-render
    expect(html).not.toMatch(/Bearer|idToken|firebase:auth/);
    expect(html).not.toMatch(/"tenants"\s*:/);
  });

  it("login tem meta noindex", () => {
    const html = readFileSync(join(OUT, "admin/login/index.html"), "utf-8");
    expect(html).toMatch(/noindex/);
  });

  it("sitemap não lista /admin", () => {
    const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf-8");
    expect(sitemap).not.toMatch(/\/admin/);
  });
});
