<template>
    <nav class="navbar navbar-expand-lg bg-body-light" style="box-shadow: 0px 4px 4px rgb(236, 236, 236);">
      <div class="container-fluid" style="gap: 5px;">
        <a class="navbar-brand" href="#" style="font-size: 20px; font-weight: 600;">
          <img class="logo" src="https://www.freeiconspng.com/uploads/pokeball-pokemon-ball-png-images-4.png" alt="Pokeball Logo" width="40" height="40">
          Pokémon API
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end me-5" id="navbarNav">
          <ul class="navbar-nav d-flex nav-gap">
            <li class="nav-item">
              <router-link to="/" style="text-decoration: none;"><a class="nav-link" aria-current="page">Pokemon</a></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/About" style="text-decoration: none;"><a class="nav-link" aria-current="page">About</a></router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style>
</style>