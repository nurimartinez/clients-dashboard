<template>
  <div class="card-item">
    <img :src="user.datos_paciente.img" />
    <div class="item-user">
      <p>
        {{ user.datos_paciente.nombre }}
        {{ user.datos_paciente.apellidos }}
      </p>
      <i class="fas fa-calendar-alt"></i><span>{{ user.datos_paciente.fecha_nacimiento }}</span>
    </div>
    <div class="item-clinic">
      {{ user.ficha_dental.clinica }}
    </div>
    <div class="item-goal">
      {{ user.ficha_dental.objetivo_tratamiento }}
    </div>
    <div class="item-status" :class="user.status">
      {{ user.status }}
    </div>
    <div class="item-select">
      <select v-model="estado" @change="changeStatus(user.id)">
        <option value="finalizado">Finalizado</option>
        <option value="pendiente">Pendiente</option>
        <option value="cancelado">cancelado</option>
      </select>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase/config.js';
import { updateDoc, doc } from 'firebase/firestore'
export default {
  props: [ 'user' ],
  data() {
    return {
      estado: this.user.status
    }
  },
  methods: {
    changeStatus(id) {
      updateDoc(doc(db, 'users', id), { status: this.estado })
      .then(() => this.$emit('updateStatus', id, this.estado))
      .catch(err => err.message);

    }
  }
}
</script>
<style lang="scss" scoped>
  .card-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.5em;
    padding: 0.3em 0.7em;
    font-size: 0.8rem;
    align-items: center;
    border: 1px solid #b6b6b6;
    border-radius: 7px;

    img {
      width: 5%;
      margin-right: 1em;
      border-radius: 50%;
    }

    .item-user {
      width: 25%;
      text-align: left;

      p {
        font-weight: bold;
      }

      i, span {
        font-size: 0.7rem;
        margin-right: 0.3em;
      }
    }

    .item-clinic, .item-goal {
      width: 21%;
      text-align: center;
    }

    .item-status {
      width: 14%;
      padding: 0.6em 0.8em;
      margin-right: 1em;
      text-align: center;
      text-transform: capitalize;
      border-radius: 10px;
    }
  }

.finalizado {
  background-color: #93eb93;
}

.pendiente {
  background-color: rgb(253, 253, 146);
}

.cancelado {
  background-color: rgb(245, 167, 167);
}
</style>