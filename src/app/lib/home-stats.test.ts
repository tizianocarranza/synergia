import { test } from "node:test";
import assert from "node:assert/strict";
import { summarizeHomeStats } from "./home-stats.ts";

test("summarizeHomeStats handles an empty database", () => {
    assert.deepEqual(
        summarizeHomeStats({ openProfessionals: 0, organizations: 0, specialtyCounts: [], featured: null }),
        { openProfessionals: 0, organizations: 0, topSpecialty: null, featured: null },
    );
});

test("summarizeHomeStats picks the top specialty, alphabetical on ties", () => {
    const stats = summarizeHomeStats({
        openProfessionals: 3,
        organizations: 2,
        specialtyCounts: [{ _id: "Go", count: 3 }, { _id: "React", count: 5 }, { _id: "Rust", count: 5 }],
        featured: null,
    });
    assert.deepEqual(stats.topSpecialty, { name: "React", count: 5 });
});
