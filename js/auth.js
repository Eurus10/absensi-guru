async function handleLogin() {
  const u = document.getElementById("login-user").value;
  const p = document.getElementById("login-pass").value;
  const { data: adm } = await _supabase
    .from("admin_users")
    .select("*")
    .eq("username", u)
    .eq("password", p)
    .single();
  if (adm) {
    localStorage.setItem("guru_user", u);
    localStorage.setItem("guru_pass", p);
    showScreen("admin-panel");
    loadAdminDashboard();
    return;
  }
  const { data: guru } = await _supabase
    .from("profil_guru")
    .select("*")
    .eq("username", u)
    .eq("password", p)
    .single();
  if (guru) {
    localStorage.setItem("guru_user", u);
    localStorage.setItem("guru_pass", p);
    processLogin(guru);
  } else alert("Login Gagal!");
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
  localStorage.clear();
  location.reload();
}
