export default function ({ $auth, redirect }) {
  //cek gagal
  if (!$auth.loggedIn) {
    return redirect("/customer/login");
  }

  //cek role
  if ($auth.strategy.name != "customer") {
    return redirect("/customer/login");
  } else {
    return;
  }
}
