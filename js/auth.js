async function handleLogin() {
  const u = document.getElementById("login-user").value.trim();
  const p = document.getElementById("login-pass").value;

  if (!u || !p) {
    alert("Username dan password wajib diisi.");
    return;
  }

  const { data: adm } = await _supabase
    .from("admin_users")
    .select("*")
    .eq("username", u)
    .eq("password", p)
    .single();
  if (adm) {
    const adminData = {
      ...adm,
      nama_lengkap: adm.nama_lengkap || adm.username,
      jabatan: adm.role === "superadmin" ? "SUPER ADMIN" : "ADMIN MONITORING",
      password: p,
    };
    await processLogin(adminData, adm.role || "admin");
    return;
  }

  const { data: guru } = await _supabase
    .from("profil_guru")
    .select("*")
    .eq("username", u)
    .eq("password", p)
    .single();

  if (guru) {
    await processLogin(guru, "guru");
    return;
  }

  alert("Login Gagal!");
}

async function handleRegister() {
  const n = document.getElementById("reg-nama").value;
  const u = document.getElementById("reg-user").value;
  const p = document.getElementById("reg-pass").value;
  await _supabase
    .from("profil_guru")
    .insert([{ username: u, password: p, nama_lengkap: n }]);
  alert("Berhasil!");
  showScreen("login-screen");
}

function togglePass(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    el.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function logout() {
  if (typeof clearLoginStorage === "function") {
    clearLoginStorage();
  } else {
    localStorage.removeItem("session_presensi");
    localStorage.removeItem("guru_user");
    localStorage.removeItem("guru_pass");
  }
  location.reload();
}
