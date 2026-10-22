import { test } from "node:test";
import assert from "node:assert/strict";
import {
    parseProfessionalFilters,
    parseOrganizationFilters,
    buildProfessionalQuery,
    buildOrganizationQuery,
    buildSearchHref,
    escapeRegex,
} from "./search.ts";

test("parseProfessionalFilters reads and trims all params", () => {
    assert.deepEqual(
        parseProfessionalFilters({ q: "  react dev ", specialty: "React", exp: "3-5", open: "1" }),
        { q: "react dev", specialty: "React", exp: "3-5", open: true },
    );
});

test("parseProfessionalFilters ignores invalid values", () => {
    assert.deepEqual(parseProfessionalFilters({ specialty: "Foo", exp: "abc", open: "yes" }), { open: false });
});

test("parseProfessionalFilters uses first of repeated values", () => {
    assert.equal(parseProfessionalFilters({ specialty: ["Go", "React"] }).specialty, "Go");
});

test("parseProfessionalFilters drops blank q and caps q at 100 chars", () => {
    assert.equal("q" in parseProfessionalFilters({ q: "   " }), false);
    assert.equal(parseProfessionalFilters({ q: "a".repeat(300) }).q?.length, 100);
});

test("parseOrganizationFilters validates area", () => {
    assert.deepEqual(parseOrganizationFilters({ area: "Finance", q: "bank" }), { q: "bank", area: "Finance" });
    assert.deepEqual(parseOrganizationFilters({ area: "Space" }), {});
});

test("buildProfessionalQuery escapes regex and combines filters", () => {
    const rx = { $regex: "C\\+\\+", $options: "i" };
    assert.deepEqual(buildProfessionalQuery({ q: "C++", specialty: "React", exp: "3-5", open: true }), {
        $or: [{ name: rx }, { description: rx }],
        specialty: "React",
        experience: { $gte: 3, $lte: 5 },
        employmentStatus: "unemployed",
    });
});

test("buildProfessionalQuery with no filters is empty", () => {
    assert.deepEqual(buildProfessionalQuery({ open: false }), {});
});

test("buildOrganizationQuery filters by area", () => {
    assert.deepEqual(buildOrganizationQuery({ area: "Finance" }), { area: "Finance" });
});

test("escapeRegex escapes special characters", () => {
    assert.equal(escapeRegex(".NET (core)*"), "\\.NET \\(core\\)\\*");
});

test("buildSearchHref omits empty values", () => {
    assert.equal(buildSearchHref("/professionals", { specialty: "C#", q: "", open: undefined }), "/professionals?specialty=C%23");
    assert.equal(buildSearchHref("/professionals", {}), "/professionals");
});

test("href round-trips through parse", () => {
    const href = buildSearchHref("/p", { specialty: ".NET Core" });
    const params = Object.fromEntries(new URL("http://x" + href).searchParams);
    assert.equal(parseProfessionalFilters(params).specialty, ".NET Core");
});
