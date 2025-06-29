<template>
  <div
    v-if="confirmationScreen"
    id="confirmationScreen"
    class="max-w-xl mx-auto card success"
  >
    <h3 id="confirmationTitle" class="no-border text-3xl !mb-2">
      ¡Inscripción realizada! 🎉
    </h3>
    <p id="confirmationMessage">
      La inscripción ha sido completada con éxito, ¡bienvenido al XXVI ENEM! En
      tu correo electrónico dispones de más información al respecto de tu plaza
      en el evento.
    </p>

    <div
      class="rounded p-2 bg-amber-200 dark:bg-amber-500/40 flex flex-row items-stretch"
    >
      <i class="i-tabler-alert-circle size-10 flex-shrink-0 mr-3" />
      <p class="p-0 m-0">
        El identificador de tu pago es:
        <span class="font-semibold !text-sm" id="paymentId">{{
          paymentId
        }}</span
        >. Guarda este número por si hay cualquier error o deseas solicitar
        factura.
      </p>
    </div>
  </div>

  <template v-else>
    <div class="card mb-6">
      <strong>Estás inscribiéndote al Foro de Empresas y Emprendimiento</strong>
      <p>
        Tu inscripción se procesará automáticamente y serás asistente una vez
        enviado este formulario.
      </p>
    </div>

    <form
      @submit.prevent="register"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
    >
      <!-- Correo electrónico -->
      <div>
        <div class="form-item" :class="invalidEmail && 'error'">
          <input
            v-model="email"
            type="text"
            id="email"
            class="peer"
            placeholder=" "
            required
            autocomplete="email"
          />
          <label
            for="email"
            class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >Correo electrónico
            <span
              class="text-red-600 dark:text-red-400"
              data-tippy-content="Obligatorio"
              >*</span
            ></label
          >
        </div>
        <p
          v-if="invalidEmail"
          class="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span class="font-semibold">Error:</span> Correo electrónico no
          válido.
        </p>
      </div>

      <!-- Confirmación correo -->
      <div>
        <div class="form-item" :class="emailsDontMatch && 'error'">
          <input
            v-model="emailConfirmation"
            type="text"
            id="email_confirmation"
            class="peer"
            placeholder=" "
            required
          />
          <label
            for="email_confirmation"
            class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >Repetir correo
            <span class="text-red-600 dark:text-red-400">*</span></label
          >
        </div>
        <p
          v-if="emailsDontMatch"
          class="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span class="font-semibold">Error:</span> Los correos electrónicos no
          coinciden.
        </p>
      </div>

      <h3 class="">Sobre ti</h3>
      <!-- Nombre -->
      <div class="form-item">
        <input
          v-model="firstName"
          type="text"
          id="first_name"
          class="peer"
          placeholder=" "
          required
          autocomplete="given-name"
        />
        <label
          for="first_name"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Nombre <span class="text-red-600 dark:text-red-400">*</span></label
        >
      </div>

      <!-- Apellidos -->
      <div class="form-item">
        <input
          v-model="lastName"
          type="text"
          id="last_name"
          class="peer"
          placeholder=" "
          required
          autocomplete="family-name"
        />
        <label
          for="last_name"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Apellidos
          <span class="text-red-600 dark:text-red-400">*</span></label
        >
      </div>

      <!-- Tipo documento identidad -->
      <div class="form-item">
        <select v-model="idType" id="last_name" required>
          <option value="" disabled>-- Seleccionar --</option>
          <option value="DNI">DNI</option>
          <option value="NIE">NIE</option>
          <option value="PASSPORT">Pasaporte</option>
        </select>
        <label
          for="last_name"
          class="px-2 text-secondary-600 dark:text-secondary-500 top-2 !scale-100 -translate-y-4 rtl:translate-x-1/4 rtl:left-auto"
          >Tipo de documento de identidad
          <span class="text-red-600 dark:text-red-400">*</span></label
        >
      </div>

      <!-- Número ID -->
      <div class="form-item">
        <input
          v-model="idNumber"
          type="text"
          id="id_number"
          class="peer"
          placeholder=" "
          required
        />
        <label
          for="id_number"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Número del documento de identidad
          <span class="text-red-600 dark:text-red-400">*</span></label
        >
      </div>

      <h3>Estudios actuales</h3>

      <!-- Universidad -->
      <div class="form-item">
        <input
          v-model="university"
          type="text"
          id="university"
          class="peer"
          placeholder=" "
        />
        <label
          for="id_number"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Universidad de estudio</label
        >
      </div>

      <!-- Bachelors -->
      <div class="form-item">
        <input
          v-model="bachelors"
          type="text"
          id="bachelors"
          class="peer"
          placeholder=" "
        />
        <label
          for="bachelors"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Grado en curso</label
        >
      </div>

      <!-- Master -->
      <div class="form-item">
        <input
          v-model="master"
          type="text"
          id="master"
          class="peer"
          placeholder=" "
        />
        <label
          for="master"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Máster en curso</label
        >
      </div>

      <!-- Doctorate -->
      <div class="form-item">
        <input
          v-model="doctorate"
          type="text"
          id="doctorate"
          class="peer"
          placeholder=" "
        />
        <label
          for="doctorate"
          class="peer-focus:px-2 peer-focus:text-secondary-600 peer-focus:dark:text-secondary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >Doctorado en curso</label
        >
      </div>

      <p v-if="error">Error: {{ error }}</p>

      <p v-if="unknownError" class="text-red-500">
        Ha habido un error inesperado, por favor intenta de nuevo más tarde o
        <a
          :href="`mailto:enem2025@anem.es?body=Error en la inscripción Foro: ${unknownError}`"
          >contacta con nosotros</a
        >.
      </p>

      <Button
        client:load
        as="button"
        type="submit"
        :disabled="loading || hasErrors"
        :data-disabled="loading || hasErrors"
        >Enviar</Button
      >
    </form></template
  >
</template>

<script setup lang="ts">
import {
  loadStripe,
  type StripeElement,
  type StripeElements,
  type StripeElementsOptionsClientSecret,
} from "@stripe/stripe-js";
import { ref } from "vue";
import { nanoid } from "nanoid";
import Button from "./ui/Button.vue";
import { computed } from "vue";
import type { Ref } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";

const isEmpty = (s: Ref<string>) => s.value === "";

const VITE_INTRANET_URL = "https://enem.wupp.dev";
const STORAGE_KEY = "enem_stripe_idemportency_key";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const confirmationScreen = ref(false);
const loading = ref(false);

const email = ref("");
const emailConfirmation = ref("");
const firstName = ref("");
const lastName = ref("");
const idType = ref("");
const idNumber = ref("");

const university = ref("");
const bachelors = ref("");
const master = ref("");
const doctorate = ref("");

const unknownError = ref();

const invalidEmail = computed(
  () => email.value && !EMAIL_REGEX.test(email.value),
);
const emailsDontMatch = computed(
  () =>
    emailConfirmation.value !== "" && email.value !== emailConfirmation.value,
);
const hasErrors = computed(
  () =>
    invalidEmail.value ||
    emailsDontMatch.value ||
    isEmpty(email) ||
    isEmpty(emailConfirmation) ||
    firstName.value === "" ||
    lastName.value === "" ||
    isEmpty(idType) ||
    isEmpty(idNumber),
);

const paymentId = ref<string>();
const error = ref<string>();

async function register() {
  loading.value = true;

  try {
    const res = await fetch(VITE_INTRANET_URL + "/api/_w/inscripcion/foro", {
      method: "POST",
      body: JSON.stringify({
        data: {
          email: email.value,
          emailConfirmation: emailConfirmation.value,
          firstName: firstName.value,
          lastName: lastName.value,
          idType: idType.value,
          idNumber: idNumber.value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const id = await res.text();
    if (id.startsWith("{")) {
      error.value = JSON.parse(id).message;
    } else {
      paymentId.value = id;
      confirmationScreen.value = true;
    }
  } catch (error: any) {
    unknownError.value = error.toString();
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret",
  );

  if (clientSecret !== null) {
    confirmationScreen.value = true;
  }
});
</script>

<style scoped>
.card {
  @apply p-5 bg-clear dark:bg-dark rounded-lg;
}

.card strong {
  @apply text-2xl;
}

.card > p:first-of-type {
  @apply text-dark dark:text-clear flex-grow mt-0.5 mb-1;
}

.card span {
  @apply text-xl font-bold;
}

.card span i {
  @apply -mb-1 size-6;
}

.form-item {
  position: relative;
}

.form-item > label,
.form-item > input {
  @apply text-black dark:text-white;
}

.form-item > input,
.form-item > select {
  @apply block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border shadow-sm border-zinc-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary-500 focus:outline-none focus:ring-0 focus:border-secondary-600;
}

.form-item > label {
  @apply absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#1c1c1c] px-2 start-1;
}

.form-item.error {
  @apply *:!text-red-600 *:dark:!text-red-400 *:!border-red-600 *:dark:!border-red-400;
}

h3 {
  @apply md:col-span-2 mt-1 -mb-1 border-b border-b-zinc-400 dark:border-b-zinc-600;
}

h3.no-border {
  @apply border-b-0;
}

#error-message {
  @apply dark:text-red-400 text-red-600 font-bold;
}

#confirmationScreen.success h3 {
  @apply text-emerald-600 dark:text-emerald-400;
}

#confirmationScreen.error h3 {
  @apply text-red-600 dark:text-red-400;
}
</style>
