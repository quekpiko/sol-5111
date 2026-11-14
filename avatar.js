"use strict";

(() => {
  const storageKey = "sol-5111-astronaut";
  const patches = { star: "★", moon: "☾", diamond: "◆" };
  const fields = {
    name: document.getElementById("avatar-name"),
    helmet: document.getElementById("avatar-helmet"),
    suit: document.getElementById("avatar-suit"),
    patch: document.getElementById("avatar-patch")
  };
  const editor = document.getElementById("avatar-editor");
  const form = document.getElementById("avatar-form");

  function normalize(profile) {
    const allowed = (field, value) => [...field.options].some((option) => option.value === value);
    return {
      name: typeof profile?.name === "string" ? profile.name.trim().slice(0, 24) : "",
      helmet: allowed(fields.helmet, profile?.helmet) ? profile.helmet : "classic",
      suit: allowed(fields.suit, profile?.suit) ? profile.suit : "orange",
      patch: allowed(fields.patch, profile?.patch) ? profile.patch : "star"
    };
  }

  function loadProfile() {
    try {
      return normalize(JSON.parse(localStorage.getItem(storageKey)));
    } catch {
      return normalize(null);
    }
  }

  function readDraft() {
    return normalize(Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.value])));
  }

  function paint(id, nameId, profile) {
    const artwork = document.getElementById(id);
    artwork.dataset.helmet = profile.helmet;
    artwork.dataset.suit = profile.suit;
    artwork.querySelector(".patch").textContent = patches[profile.patch];
    document.getElementById(nameId).textContent = profile.name || languages[document.documentElement.lang].defaultCallSign;
  }

  let profile = loadProfile();
  const paintCard = () => {
    paint("avatar-card", "commander-title", profile);
    paint("avatar-field", "field-name", profile);
  };
  const paintPreview = () => paint("avatar-preview", "avatar-preview-name", readDraft());

  document.getElementById("edit-avatar").addEventListener("click", () => {
    for (const [key, field] of Object.entries(fields)) field.value = profile[key];
    paintPreview();
    editor.showModal();
  });
  form.addEventListener("input", paintPreview);
  form.addEventListener("change", paintPreview);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    profile = readDraft();
    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
    } catch {
      // The saved look still applies to the current page.
    }
    paintCard();
    editor.close();
  });
  document.getElementById("cancel-avatar").addEventListener("click", () => editor.close());
  document.getElementById("close-avatar").addEventListener("click", () => editor.close());
  document.getElementById("language").addEventListener("change", paintCard);
  paintCard();
})();
