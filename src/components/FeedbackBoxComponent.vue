<template>
  <div class="feedback-box" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
      validator: (value) => ["success", "warning", "error"].includes(value),
    },
  },

  setup() {
    const visible = ref(true);

    watchEffect(() => {
      setTimeout(() => {
        visible.value = false;
      }, 6000);
    });

    return { visible };
  },
};
</script>

<style>
.feedback-box {
  padding: 1rem;
  color: white;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  transition: all 0.3s;
  opacity: 1;
  border-radius: 5px;
}

.success {
  background-color: #4caf50;
}

.warning {
  background-color: #ff9800;
}

.error {
  background-color: #f44336;
}

.feedback-box:not(.visible) {
  opacity: 1;
  pointer-events: none;
}
</style>
