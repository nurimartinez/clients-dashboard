<template>
  <div class="card-item">
    <img :src="user.datos_paciente.img" />
    <div class="card-info">
      <div class="item-user">
        <p>
          {{ user.datos_paciente.nombre }}
          {{ user.datos_paciente.apellidos }}
        </p>
        <p>{{ user.datos_paciente.fecha_nacimiento }}</p>
      </div>
      <div class="item-info">
        <div>{{ user.ficha_dental.clinica }}</div>
        <div>{{ user.ficha_dental.objetivo_tratamiento }}</div>
      </div>
      <div class="item-status" :class="user.status">{{ user.status }}</div>
      <div class="item-buttons">
        <div>
          <i @click="changeStatus(user.id, 'finalizado')" class="fas fa-check"></i>
        </div>
        <div>
          <i @click="changeStatus(user.id, 'pendiente')" class="fas fa-clock"></i>
        </div>
        <div>
          <i @click="changeStatus(user.id, 'cancelado')" class="fas fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase/config.js';
import { updateDoc, doc } from 'firebase/firestore'
export default {
  props: ["user"],
  methods: {
    changeStatus(id, estado) {
      updateDoc(doc(db, 'users', id), { status: estado })
        .then(() => this.$emit("updateStatus", id, estado))
        .catch((err) => console.log(err.message));
    },
  },
};
</script>
<style lang="scss" scoped>
.card-item {
  width: 18%;
  min-height: 350px;
  margin-bottom: 1.5em;
  text-align: center;
  font-size: 0.8rem;

  img {
    width: 100%;
    display: block;
    border-radius: 7px 7px 0 0;
  }

  .card-info {
    width: 100%;
    border: 1px solid #b6b6b6;
    border-top: none;
    border-radius: 0 0 7px 7px;
  }

  .item-user {
    padding-top: 0.4em;
    min-height: 70px;

    p:first-child {
      font-weight: bold;
    }
  }

  .item-info {
    min-height: 50px;
  }

  .item-status {
    width: 90%;
    margin: 1em auto;
    padding: 0.5em 0;
    border-radius: 10px;
    text-transform: capitalize;
  }

  .item-buttons {
    width: 90%;
    margin: 0 auto 0.5em;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    div {
      width: 30%;
      padding: 0.5em 0;
      border-radius: 7px;
      background-color: #464646;

      i {
        color: #fff;
      }
    }

    div:hover {
      opacity: 0.6;
    }

    div:nth-child(2) {
      background-color: #727272;
    }

    div:last-child {
      background-color: #a3a2a2;
    }
  }
}

.finalizado {
  background-color: #93eb93;
}

.pendiente {
  background-color: #fdfd92;
}

.cancelado {
  background-color: #f5a7a7;
}
</style>