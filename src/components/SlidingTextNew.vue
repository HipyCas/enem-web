<template>
  <span class="sliding-text-wrapper">
    <span>
      <span>Matemáticas</span>
      <span>Estadísitica</span>
      <span>Ciencia de Datos</span>
      <span>Inteligencia Artificial</span>
      <span>Álgebra</span>
      <span>Análisis</span>
      <span>Inferencia</span>
      <span>Matemáticas</span>
    </span>
  </span>
</template>

<style scoped>
.sliding-text-wrapper {
  display: inline-block;
  overflow-y: hidden;
  height: 1lh;
  width: max-content;
  margin-bottom: -7px;
}

.sliding-text-wrapper span {
  /*   transform: translateY(-3lh) */
  animation: slide-text 8s linear infinite;
}

.sliding-text-wrapper span span {
  /* @apply bg-gradient-to-tr from-secondary-700 to-tertiary-800 bg-clip-text text-transparent; */
  @apply text-secondary;
  display: block;
}

@keyframes slide-text {
  0% {
    transform: translateY(0);
  }

  12%,
  16% {
    transform: translateY(-1lh);
  }

  26%,
  30% {
    transform: translateY(-2lh);
  }

  40%,
  44% {
    transform: translateY(-3lh);
  }

  54%,
  58% {
    transform: translateY(-4lh);
  }

  68%,
  72% {
    transform: translateY(-5lh);
  }

  82%,
  86% {
    transform: translateY(-6lh);
  }

  92%,
  100% {
    transform: translateY(-7lh);
  }
}
</style>
