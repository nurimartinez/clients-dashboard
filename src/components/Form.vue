<template>
  <div class="backdrop">
    <form ref="form">
      <h2>Registro de nuevos clientes</h2>
      <label for="nombre" class="form-title">Nombre</label>
      <input type="text" v-model="nombre" id="nombre" class="form-item" required />
      <label for="apellidos" class="form-title">Apellidos</label>
      <input type="text" v-model="apellidos" id="apellidos" class="form-item" required />
      <label class="form-title">Fecha de nacimiento</label>
      <input type="date" v-model="fecha" class="form-item" required />
      <label class="form-title">Sexo</label>
      <select v-model="sexo" class="form-item">
        <option value="mujer">Mujer</option>
        <option value="hombre">Hombre</option>
      </select>
      <label for="clinica" class="form-title">Clínica</label>
      <input type="text" v-model="clinica" id="clinica" class="form-item" />
      <div class="form-item">
        <label class="form-title">Recorte alineadores</label>
        <div>
          <input type="radio" v-model="recorte" value="encia" checked /><label
            >Recortar dejando 1-3 mm de encía</label
          >
        </div>
        <div>
          <input type="radio" v-model="recorte" value="cuello" /><label
            >Recortar a nivel de los cuellos</label
          >
        </div>
      </div>
      <div class="form-item">
        <div>
          <label class="form-title">¿SecretRetainer?</label>
        </div>
        <div>
          <input type="radio" v-model="retainer" value="si" checked /><label>Sí</label>
          <input type="radio" v-model="retainer" value="no" /><label>No</label>
        </div>
      </div>
      <div class="form-buttons">
        <button type="submit">Guardar</button>
        <button type="button" class="cancel" @click="closeForm">Cancelar</button>
        <button type="button" class="clear" @click="resetForm">Limpiar</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      nombre: "",
      apellidos: "",
      fecha: "",
      sexo: "mujer",
      clinica: "",
      recorte: "",
      retainer: "",
    };
  },
  methods: {
    closeForm() {
      this.$emit("close");
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;

  form {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
    padding: 2em;
    text-align: left;
    font-size: 0.9rem;
    border-radius: 10px;
    background-color: #fff;

    h2 {
      margin-bottom: 0.6em;
      padding-bottom: 0.2em;
      text-align: center;
      border-bottom: 0.2px solid #464646;
    }

    .form-title {
      margin-bottom: 0.3em;
      font-weight: bold;
    }

    .form-item {
      margin-bottom: 0.5em;
    }

    input[type="radio"] {
      margin-right: 0.5em;
    }

    [value="si"] + label {
      margin-right: 1em;
    }

    .form-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5em;

      button {
        width: 32%;
        padding-top: 0.8em;
        padding-bottom: 0.8em;
        font-weight: bold;
        color: #fff;
        background-color: #0d81ea;
        border: none;
        border-radius: 7px;
        cursor: pointer;
      }

      .cancel {
        background-color: #32b6e6;
      }

      .clear {
        background-color: #bfb096;
      }
    }
  }
}
</style>