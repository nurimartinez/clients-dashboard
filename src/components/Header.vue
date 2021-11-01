<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png">
      <h1>SecretAligner</h1>
    </div>
    <div class="user">
      <i class="far fa-user-circle"></i>
      <span>Dr. Pablo López</span>
    </div>
  </header>
  <h2>Listado de Pacientes</h2>
</template>

<style lang="scss" scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  color: #FFF;
  background-color: #000;

  .logo {
    display: flex;

    img {
      width: 25px;
      margin-right: 10px;
    }
    h1 {
      font-size: 1.5rem;
    }
  }

  .user {
    display: flex;
    align-items: center;

    i {
      font-size: 1.5em;
      margin-right: 10px;
    }
  }
}

h2 {
  padding: 1em 3em;
  text-align: left;
  font-size: 0.8rem;
  border: none;
  color: #000;
  background-color: #dddddd;
}

@media screen and (max-width: 450px) {
  header {
    flex-direction: column;
    justify-content: center;
  
    .logo {
      img {
        margin-right: 0;
        margin-bottom: 0.8em;
      }
      h1 {
      display: none;
      }
    }
}
}
</style>