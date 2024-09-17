<template>
  <header class="section-header fixed-top">
    <section class="header-main">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-3 col-sm-4 col-md-4 col-5"> 
              <nuxt-link to="/" class="brand-wrap" data-abc="true">
                <span class="logo p-2" >Thirft <i>Fit</i></span>
              </nuxt-link>
          </div>
          <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-100"> 
                <input type="text" class="form-control search-form" style="width:55%;" placeholder="mau belanja apa hari ini ?">
                <div class="input-group-append"> 
                  <button class="btn btn-primary search-button"> <i class="fa fa-search"></i> </button> 
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-4">
            <div class="d-flex justify-content-end">
              <a href="#" class="btn search-button btn-md d-md-block ml-4 custom-text1"> <span class="ml-2">0</span> | Rp. 0</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <nav class="navbar navbar-expand-md navbar-main border-bottom p-2">
      <div class="container-fluid">
        <div class="d-md-none">
          <div class="input-group"> 
            <input type="search" name="search" class="form-control" placeholder="mau belanja apa hari ini ?">
            <div class="input-group-append"> 
              <button class="btn btn-warning"> <i class="fa fa-search"></i></button> 
            </div>
          </div>
        </div> 
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#dropdown6"
          aria-expanded="false"> <span class="navbar-toggler-icon"></span> </button>
        <div class="navbar-collapse collapse" id="dropdown6">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" > <a href="#" style="margin-right: 55px;" class="nav-link navbar-main-text nav-custom" data-abc="true"> KATEGORI</a> </li>
            <li class="nav-item" > <a href="#" style="margin-right: 55px;" class="nav-link navbar-main-text nav-custom" data-abc="true"><i class="fa fa-shopping-bag"></i> SEMUA PRODUK</a> </li>
            <li class="nav-item" > <a href="#" style="margin-right: 55px;" class="nav-link navbar-main-text nav-custom" data-abc="true"><i class="fa fa-info-circle"></i> TENTANG</a> </li>
            <li class="nav-item" > <a href="#" style="margin-right: 55px;" class="nav-link navbar-main-text nav-custom" data-abc="true"><i class="fa fa-comments"></i> KONTAK</a> </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" v-if="!$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-login'}" class="nav-link nav-custom" href="#" role="button" aria-expanded="false"> <i class="fa fa-user-circle"></i>
                ACCOUNT</nuxt-link>
            </li>
            <li class="nav-item dropdown" v-if="$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-dashboard'}" class="nav-link nav-custom" href="#" role="button" aria-expanded="false"> <i class="fa fa-tachometer-alt"></i>
                DASHBOARD</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
.btn {
  font-size: initial;
}
.header-main, .navbar-main, .nav-custom {
  background: #152259;
}
.custom-text1 {
  color: black;
}

.nav-link {
  color: white;
  border-radius: 15px; 
  padding: 10px 20px;
  margin-bottom: 10px; 
  transition: background-color 0.3s ease; 
}
.nav-custom:hover {
  color: rgba(80, 156, 189);
}
 
</style>