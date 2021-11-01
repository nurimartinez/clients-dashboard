<template>
  <Header />
  <main>
    <!-- Search section -->
    <div class="search">
      <div>
        <i class="far fa-address-card"></i>
        <div>
          <p>Listado de pacientes</p>
          <p>Visualización de pacientes</p>
        </div>
      </div>
      <form>
        <input type="text" v-model="searchTerm" placeholder="Buscar..." @keyup="searchUser" />
        <i class="fas fa-search"></i>
      </form>
    </div>
    <!-- New user and CSV download section -->
    <div class="buttons">
      <button type="button" @click="toggleNewUser()">
        <i class="fas fa-plus"></i><span>Nuevo Cliente</span>
      </button>
      <button id="csv" type="button" @click="downloadCVS()">
        <i class="fas fa-file-download"></i><span>Descargar CSV</span>
      </button>
    </div>
    <!-- User list select opcions section -->
    <div class="selectors">
      <i class="fas fa-bars" @click="showList"></i>
      <i class="fas fa-table" @click="showCards"></i>
      <span @click="setPages(5)">5</span>
      <span @click="setPages(10)">10</span>
      <span @click="setPages(15)">15</span>
    </div>
    <!-- New User Form -->
    <Form v-show="showForm" @close="toggleNewUser" />
    <!-- User list section -->
    <section>
      <div v-if="listDisplay" class="user-list">
        <div class="user-list-title">
          <div>Nombre y apellidos</div>
          <div>Clínica</div>
          <div>Objetivo</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        <!-- List display -->
        <ListItem v-for="user in displayUsers" :key="user" :user="user" @updateStatus="userStatus" />
        </div>
      <div v-if="cardsDisplay" class="user-list">
        <!-- Card display -->
        <CardItem v-for="user in displayUsers" :key="user" :user="user" @updateStatus="userStatus" />
      </div>
      <!-- Pagination section -->
      <div class="pages">
        <button type="button" class="pages-button pages-before" v-if="page != 1" @click="page--">&lt;</button>
        <button type="button" class="pages-button" v-for="pageNumber in pages" :key="pageNumber" @click="page = pageNumber">{{ pageNumber }}</button>
        <button type="button" class="pages-button pages-next" v-if="page < pages.length" @click="page++"
        >></button>
      </div>
    </section>
  </main>
</template>

<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import ListItem from "./components/ListItem.vue";
import CardItem from "./components/CardItem.vue";
import { db } from './firebase/config.js';
import { collection, onSnapshot } from 'firebase/firestore'
export default {
  name: "App",
  components: { Header, Form, ListItem, CardItem },
  data() {
    return {
      users: [],
      searchTerm: "",
      showForm: false,
      listDisplay: true,
      cardsDisplay: false,
      page: 1,
      perPage: 5,
      pages: [],
      visibleUsers: [],
    };
  },
  methods: {
    // Search in the user list
    searchUser() {
      let term = this.searchTerm.toLowerCase();
      let users = document.querySelectorAll(".card-item");
      users.forEach((user) => {
        let title = user.textContent.toLowerCase();
        if (title.includes(term)) user.style.display = "flex";
        else user.style.display = "none";
      });
    },
    // Open and close the New User form
    toggleNewUser() {
      this.showForm = !this.showForm;
    },
    // Download the CSV file
    downloadCVS() {
      let list = this.users;
      let str = "";
      for (let i = 0; i < list.length; i++) {
        let line = "";
        line += `${(i + 1).toString()},"${list[i].datos_paciente.nombre}",`;
        line += `"${list[i].datos_paciente.apellidos}",`;
        line += `"${list[i].datos_paciente.fecha_nacimiento}",`;
        line += `"${list[i].ficha_dental.clinica}",`;
        line += `"${list[i].ficha_dental.objetivo_tratamiento}"`;
        str += line + "\r\n";
      }

      let blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) navigator.msSaveBlob(blob, exportedFilenmae);
      else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "export.csv");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    // Show the list display
    showList() {
      this.listDisplay = true;
      this.cardsDisplay = false;
    },
    // Show the card display
    showCards() {
      this.listDisplay = false;
      this.cardsDisplay = true;
    },
    // Paginate the users according to the number per page
    paginate(users) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return users.slice(from, to);
    },
    // Create the number of pages
    setNumberOfPages() {
      this.pages = [];
      let numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    // Select number of users per page
    setPages(number) {
      this.page = 1;
      this.perPage = number;
      this.setNumberOfPages();
    },
    // Change the user status
    userStatus(id, estado) {
      let p = this.users.find((user) => {
        return user.id === id;
      });
      p.status = estado;
    },
  },
  mounted() {
    onSnapshot(collection(db, 'users'), snapshot => {
      snapshot.docs.forEach(doc => this.users.push({ ...doc.data(), id: doc.id}))
    })
  },
  computed: {
    displayUsers() {
      return this.paginate(this.users);
    },
  },
  watch: {
    users() {
      this.setNumberOfPages();
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #464646;
}

main {
  width: 95%;
  max-width: 800px;
  margin: 0 auto;

  /* Styles for the search section */
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0;

    div:first-child {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      i {
        font-size: 1.7rem;
        margin-right: 15px;
      }

      p {
        font-size: 0.8rem;
        text-align: left;
      }

      p:first-child {
        font-weight: bold;
        font-size: 1.1rem;
      }
    }

    form {
      width: 50%;
      position: relative;

      input {
        display: block;
        width: 100%;
        padding: 0.7rem 35px;
        background-color: #dddddd;
        border: none;
        border-radius: 7px;
      }

      i {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
    }
  }

  /* Styles for the New User and CSV Download buttons */
  .buttons {
    text-align: left;

    button {
      width: 200px;
      padding: 10px 20px;
      font-weight: bold;
      background-color: #ffffff;
      color: #12a3cf;
      border: 2px solid #12a3cf;
      border-radius: 7px;
      cursor: pointer;
    }

    button:first-child {
      margin-right: 1.5em;
    }

    i {
      margin-right: 1em;
    }
  }

  /* Styles for the list option selectors */
  .selectors {
    padding: 15px 0;
    text-align: left;
    font-weight: bold;
    cursor: pointer;

    i {
      margin-right: 18px;
    }
    span {
      margin-right: 15px;
      letter-spacing: -0.1rem;
    }
  }
}

/* Styles for the user list */
.user-list {
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .user-list-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5em;
    text-align: center;
    font-size: 0.8rem;
    font-weight: bold;

    div {
      width: 20%;
    }

    div:first-child {
      width: 33%;
      text-align: left;
    }

    div:nth-child(4),
    div:last-child {
      width: 15%;
    }
  }
}

/* Styles for the pagination buttons */
.pages {
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;

  .pages-button {
    width: 40px;
    height: 40px;
    font-weight: bold;
    border: none;
    border-top: 1px solid #b6b6b6;
    border-bottom: 1px solid #b6b6b6;
    cursor: pointer;
  }

  .pages-button:hover {
    color: #fff;
    background-color: #12a3cf;
  }

  button:first-child {
    border-radius: 7px 0 0 7px;
    border-left: 1px solid #b6b6b6;
  }

  button:last-child {
    border-radius: 0 7px 7px 0;
    border-right: 1px solid #b6b6b6;
  }
}
</style>
