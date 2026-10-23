import { test } from "node:test";
import assert from "node:assert/strict";
import { getInitials } from "./initials.ts";

test("getInitials uses first and last word", () => {
    assert.equal(getInitials("Lucía Fernández"), "LF");
    assert.equal(getInitials("Ana María López"), "AL");
});

test("getInitials handles a single word and extra whitespace", () => {
    assert.equal(getInitials("  Cher "), "C");
});

test("getInitials returns ? for empty names", () => {
    assert.equal(getInitials(""), "?");
    assert.equal(getInitials("   "), "?");
});

test("getInitials uppercases", () => {
    assert.equal(getInitials("ana lópez"), "AL");
});
