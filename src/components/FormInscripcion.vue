<template>
  <div
    v-if="confirmationScreen"
    id="confirmationScreen"
    class="max-w-xl mx-auto card"
  >
    <h3 id="confirmationTitle" class="no-border text-3xl !mb-2"></h3>
    <p id="confirmationMessage"></p>

    <div
      class="rounded p-2 bg-amber-200 dark:bg-amber-500/40 flex flex-row items-stretch"
    >
      <i class="i-tabler-alert-circle size-10 flex-shrink-0 mr-3" />
      <p class="p-0 m-0">
        El identificador de tu pago es:
        <span class="font-semibold !text-sm" id="paymentId"></span>. Guarda este
        número por si hay cualquier error o deseas solicitar factura.
      </p>
    </div>
  </div>

  <template v-else>
    <div class="card mb-6">
      <strong>Estás inscribiéndote en modalidad Online</strong>
      <p>
        Tu inscripción se procesará automáticamente y se te cobrará directamente
        a través de esta página.
      </p>

      <div class="*:block *:mb-1">
        <span class="text-emerald-800 dark:text-emerald-100"
          ><i class="i-tabler-lock-check"></i> Pago seguro con Stripe</span
        >
        <span
          ><i class="i-tabler-user"></i> A Asociación Nacional de Estudiantes de
          Matemáticas</span
        >
        <span class="text-primary-700 dark:text-primary-400"
          ><i class="i-tabler-cash"></i> Total: 15€</span
        >
      </div>
    </div>

    <form
      v-if="paymentScreen"
      id="payment-form"
      @submit.prevent="confirmPayment"
    >
      <div id="payment-element">
        <!-- Elements will create form elements here -->
      </div>
      <Button
        as="button"
        id="submit"
        type="submit"
        class="w-full"
        :disabled="loading"
        >Submit</Button
      >
      <p id="error-message">
        <!-- Display error message to your customers here -->
      </p>
    </form>

    <form
      v-else
      @submit.prevent="initPayment"
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

      <h3 class="col-span-2">Estudios actuales</h3>

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

      <p v-if="unknownError" class="text-red-500">
        Ha habido un error inesperado, por favor intenta de nuevo más tarde o
        <a
          :href="`mailto:enem2025@anem.es?body=Error en la inscripción Online: ${unknownError}`"
          >contacta con nosotros</a
        >.
      </p>

      <Button
        client:load
        as="button"
        type="submit"
        :disabled="loading || hasErrors"
        :data-disabled="loading || hasErrors"
        >Confirmar y pagar</Button
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

const props = defineProps<{
  modality: "FORO" | "ONLINE";
  price: number;
  name: string;
}>();

const isEmpty = (s: Ref<string>) => s.value === "";

const VITE_INTRANET_URL = "https://enem.wupp.dev";
const STORAGE_KEY = "enem_stripe_idemportency_key";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const stripe = await loadStripe(
  "pk_test_51RQXxfRK3kLCG5YsYwACjqqzzD814qGO5OLlJ43OQWPz6AT4WaMKbkD3DBTX7RpNOPcIN5ERkDG9DF2aqnIxA8by00LiDpUqs1",
);

const confirmationScreen = ref(false);
const paymentScreen = ref(false);
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

let stripeElements: StripeElements;
async function initPayment() {
  loading.value = true;

  try {
    const res = await fetch(VITE_INTRANET_URL + "/api/_w/inscripcion/intent", {
      method: "POST",
      body: JSON.stringify({
        modality: props.modality,
        data: {
          email: email.value,
          emailConfirmation: emailConfirmation.value,
          firstName: firstName.value,
          lastName: lastName.value,
          idType: idType.value,
          idNumber: idNumber.value,
        },
        idempotencyKey: getIdempotencyKey(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (stripe) {
      const options: StripeElementsOptionsClientSecret = {
        clientSecret: json.client_secret,
        // Fully customizable with appearance API.
        appearance: {
          variables: {
            colorPrimary: "#fda575",
          },
        },
      };

      // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
      stripeElements = stripe.elements(options);

      // Create and mount the Payment Element
      const paymentElementOptions = { layout: "accordion" };
      const paymentElement = stripeElements.create(
        "payment",
        paymentElementOptions,
      );
      paymentScreen.value = true;
      await nextTick();
      paymentElement.mount("#payment-element");
    } else {
      document.getElementById("error-message")!.innerText =
        "No ha sido posible conectarse a Stripe";
    }
  } finally {
    loading.value = false;
  }
}
async function confirmPayment() {
  if (stripe === null || stripeElements === undefined) return;

  loading.value = true;

  const { error } = await stripe.confirmPayment({
    elements: stripeElements,
    confirmParams: {
      return_url: "https://enem.anem.es/2025/inscripciones/pago_realizado",
    },
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    loading.value = false;
    const messageContainer = document.querySelector("#error-message");
    messageContainer!.textContent = error.message ?? null;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
}

async function managePaymentComplete(clientSecret: string) {
  if (stripe === null) return;

  stripe
    .retrievePaymentIntent(clientSecret)
    .then(({ paymentIntent }) => {
      const screen = document.getElementById("confirmationScreen")!;
      const title = document.getElementById(
        "confirmationTitle",
      )! as HTMLHeadElement;
      const message = document.getElementById(
        "confirmationMessage",
      )! as HTMLParagraphElement;

      (document.getElementById("paymentId")! as HTMLSpanElement).innerText =
        paymentIntent?.id ?? "";

      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent?.status) {
        case "succeeded":
          screen.classList.add("success");
          title.innerText = "¡Inscripción realizada! 🎉";
          message.innerText =
            "La inscripción y pago han sido completados con éxito, ¡bienvenido al XXVI ENEM! En tu correo electrónico dispones de más información al respecto de tu plaza en nuestro evento.";
          clearIdempotencyKey();
          break;

        case "processing":
          title.innerText = "Pago en proceso";
          message.innerText =
            "Estamos procesando tu pago. Recibirás más información al respecto en tu correo electrónico. Tranquilo, tus datos están guardados a salvo.";
          break;

        case "requires_payment_method":
          screen.classList.add("error");
          title.innerText = "Pago fallido";
          message.innerText =
            "El pago de la inscripción ha fallado. Vuelve a intentarlo con otro método de pago.";
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          break;

        default:
          screen.classList.add("error");
          title.innerText = "Algo ha salido mal";
          message.innerText =
            "Ha habido un error inesperado. Vuelve a intentar registrarte y, si el error persiste, por favor contacta con nosotros por correo electrónico.";
          break;
      }
    })
    .catch(
      (e) =>
        (document.querySelector<HTMLParagraphElement>("#message")!.innerText =
          "Error inesperado, contacta con nosotros"),
    );
}
onMounted(() => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret",
  );

  if (clientSecret !== null) {
    confirmationScreen.value = true;
    managePaymentComplete(clientSecret);
  }
});

function getIdempotencyKey() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (item === null || item === "") {
    const newKey = nanoid();
    localStorage.setItem(STORAGE_KEY, newKey);
    return newKey;
  } else return item;
}

function clearIdempotencyKey() {
  localStorage.removeItem(STORAGE_KEY);
}
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
  @apply col-span-2 mt-1 -mb-1 border-b border-b-zinc-400 dark:border-b-zinc-600;
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
